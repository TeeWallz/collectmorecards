import { useRef, useState } from 'react'
import { useHistory, Link, useLocation, Redirect } from 'react-router-dom'


import { useAuth } from '../contexts/Auth'
import { LoadingIcon } from './LoadingIcon'

export function ResetPassword() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const password2Ref = useRef()
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const ResetStatuses = {
        Nothing: 0,
        InProgress: 1,
        Done: 2,
        Error: 3
    }
    const [resetStatus, setResetStatus] = useState(ResetStatuses.Nothing);
    // alert("Ass")

    // Get resetPasswordForEmail function from the auth context
    const { resetPasswordForEmail, updateUser } = useAuth()

    const history = useHistory()
    const location = useLocation();
    const params = Object.fromEntries(new URLSearchParams(location.hash.replace("#", "?")))
    // alert('ass')
    // debugger;

    async function handleSubmit(e) {
        e.preventDefault()

        // Get email and password input values
        const password = passwordRef.current.value;
        const password2 = password2Ref.current.value;

        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password needs to be at least 6 characters long.');
            return;
        }


        setResetStatus(ResetStatuses.InProgress);
        const { data, error } = await updateUser(location.state.access_token, { password: password, })

        if (error) {
            setResetStatus(ResetStatuses.Nothing);
            setError('Error Resetting Password. ' + error.message)
            setMessage('');
        } else {
            setResetStatus(ResetStatuses.Done);
        }
    }

    // We have recieved a reset requet. Force a redirect as supabase does wierd stuff
    if (location.hash) {
        history.push({
            pathname: '/resetpassword',
            state: params
        });
        return <></>
    }
    // We have/nt recieved a hash or state. Nothing to do.
    else if (!(location.state)) {
        // type=recovery
        return (
            <>
                Redirect to Home
            </>
        )
    }
    else if (!(location.state.type = 'recovery')) {
        return (
            <>
                Invalid Reset Request
            </>
        )
    }
    if (resetStatus == ResetStatuses.Nothing) {
        return (
            <>
                <h2>Reset Password</h2>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Password
                            <input
                                name="password"
                                type="password"
                                ref={passwordRef}
                            />
                        </label>
                        <br />
                        <label>
                            Re-type password
                            <input
                                name="passwordVerify"
                                type="password"
                                ref={password2Ref}
                            />
                        </label>
                        <br />
                        <span style={{ color: "red" }}>
                            {error}
                        </span>
                        <span style={{ color: "green" }}>
                            {message}
                        </span>
                        <br />
                        <button type="submit">Reset password</button>
                    </form>
                </div>
            </>
        )
    }
    else if (resetStatus == ResetStatuses.InProgress) {
        return (
            <>
                <div>Resetting Password...</div>
                <br />
                <LoadingIcon />
            </>
        )
    }
    else if (resetStatus == ResetStatuses.Done) {
        return (
            <>
                <div>Password reset successful!</div>
                <br />
                <Link to="/login">Log In</Link>
            </>
        )
    }
    console.lof(resetStatus)
}