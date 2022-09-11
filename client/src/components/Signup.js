import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { Google_Button_SignUp, Github_Button_SignUp, Email_Button_SignUp } from './LoginButtons'
import { useAuth } from '../contexts/Auth'

export function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()

    // Get signUp function from the auth context
    const { signUp, signIn } = useAuth()

    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        // Get email and password input values
        const email = emailRef.current.value
        const password = passwordRef.current.value

        // Calls `signUp` function from the context
        const { error } = await signUp({ email, password })

        if (error) {
            alert('Error Signing Up\n' + error.message)
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

                <button type="submit">Sign up</button>
                <br />
            </form>
            <div onClick={() => { handleThirtyPartyLogin("google") }}>
                <Google_Button_SignUp />
            </div>
            <div onClick={() => { handleThirtyPartyLogin("github") }}>
                <Github_Button_SignUp />
            </div>
            <br />

            <p>
                Already have an account? <Link to="/login">Log In</Link>
                <br />
                Forgotten Password? <Link to="/forgottenpassword">Reset</Link>
            </p>
        </>
    )
}