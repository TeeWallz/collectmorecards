import React, { useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase'

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check active sessions and sets the user
        const session = supabase.auth.session()

        setUser(session?.user ?? null)
        setLoading(false)

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => {
            listener?.unsubscribe()
        }
    }, [])

    // Will be passed down to Signup, Login and Dashboard components
    const value = {
        signUp: (data) => supabase.auth.signUp(data),
        signIn: (data) => supabase.auth.signIn(data),
        signOut: () => supabase.auth.signOut(),
        resetPasswordForEmail: (data, options) => supabase.auth.api.resetPasswordForEmail(data, options),
        // For passowrd resets
        updateUser: (access_token, attributes) => supabase.auth.api.updateUser(access_token, attributes),
        // For user attributes
        update: (attributes) => supabase.auth.update({ data: attributes}),
        // The user object
        user
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}