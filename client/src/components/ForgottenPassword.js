import { useRef, useState } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'


import { useAuth } from '../contexts/Auth'
import { LoadingIcon } from './LoadingIcon'

export function ForgottenPassword() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const ResetStatuses = {
        Nothing: 0,
        InProgress: 1,
        Sent: 2,
        Error: 3
    }
    const [resetStatus, setResetStatus] = useState(ResetStatuses.Nothing);
    const [resetError, setResetError] = useState('');
    // alert("Ass")

    // Get resetPasswordForEmail function from the auth context
    const { resetPasswordForEmail } = useAuth()

    const history = useHistory()
    const location = useLocation();
    const params = Object.fromEntries(new URLSearchParams(location.hash.replace("#", "?")))

    // if(params.type){
    //     history.push("/resetpassword?code=" + params.access_token)
    // }



    async function handleSubmit(e) {
        e.preventDefault()

        // Get email and password input values
        const email = emailRef.current.value
        // Calls `signUp` function from the context
        setResetStatus(ResetStatuses.InProgress);
        const { data, error } = await resetPasswordForEmail(email, { redirectTo: "http://localhost:3000/resetpassword", })

        if (error) {
            alert('Error Signing Up\n' + error.message)
            setResetError(error.message)
            setResetStatus(ResetStatuses.Error);
        } else {
            console.log(data)
            setResetStatus(ResetStatuses.Sent);
        }
    }

    let reset_section = (<></>)

    if (resetStatus == ResetStatuses.Nothing) {
        reset_section = (
            <>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="input-email">Email</label>
                    <input id="input-email" type="email" ref={emailRef} />
                    <br />

                    <button type="submit">Request Password Reset</button>
                </form>
                <br />

            </>
        )
    }
    else if (resetStatus == ResetStatuses.Sent) {
        reset_section = (
            <>
                <div>
                    Password Reset Successful. Please check your email
                </div>
            </>
        )
    }
    else if (resetStatus == ResetStatuses.InProgress) {
        reset_section = (
            <>
                <div>
                    Requesting Password Reset...
                    <LoadingIcon />
                </div>
            </>
        )
    }
    else if (resetStatus == ResetStatuses.Error) {
        reset_section = (
            <>
                <div>
                    Error
                </div>
            </>
        )
    }
    return (
        <>
            {reset_section}

            <br />

            <p>
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </>
    )


}