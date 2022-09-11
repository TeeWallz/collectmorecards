
import { useHistory } from 'react-router'
import { useAuth } from '../contexts/Auth'

export function Logout() {
    // Get current user and signOut function from context
    const { user, signOut } = useAuth()

    const history = useHistory()


    async function handleSignOut() {
        // Ends user session
        await signOut()

        // Redirects the user to Login page
        history.push('/')
    }
    handleSignOut();


    return (
        <>
        </>
    )
}