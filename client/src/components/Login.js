import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'
import { Google_Button_SignIn, Github_Button_SignIn, Email_Button_SignIn } from './LoginButtons'

export function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()

    // Get signUp function from the auth context
    const { user, signIn } = useAuth()

    const history = useHistory()

    // if(user){
    //     history.push('/')
    // }

    async function handleSubmit(e) {
        e.preventDefault()

        // Get email and password input values
        const email = emailRef.current.value
        const password = passwordRef.current.value

        // Calls `signIn` function from the context
        const { error } = await signIn({ email, password })

        if (error) {
            alert('error signing in')
        } else {
            // Redirect user to Dashboard
            history.push('/')
        }
    }

    async function handleThirtyPartyLogin(providor) {

        // Calls `signIn` function from the context
        const { user, session, error } = await signIn({
            // provider can be 'github', 'google', 'gitlab', and more
            provider: providor,
        }, () => {
            alert('uh')
            if (error) {
                alert('error signing in')
            } else {
                // Redirect user to Dashboard
                history.push('/')
            }
        })

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input-email">Email</label>
                <input id="input-email" type="email" ref={emailRef} />

                <label htmlFor="input-password">Password</label>
                <input id="input-password" type="password" ref={passwordRef} />

                <br />

                <button type="submit">Login</button>
                <br />

            </form>
            <div onClick={() => { handleThirtyPartyLogin("google") }}>
                <Google_Button_SignIn />
            </div>
            <div onClick={() => { handleThirtyPartyLogin("github") }}>
                <Github_Button_SignIn />
            </div>
            <br />

            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
                <br />
                Forgotten Password? <Link to="/forgottenpassword">Reset</Link>
            </p>
        </>
    )

}