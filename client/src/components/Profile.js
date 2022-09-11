
import { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../contexts/Auth'
import { SignInSection } from './SignInSection'

export function Profile() {
    const nameRef = useRef()
    const [message, setMessage] = useState({ show: false, color: 'red', value: '' });
    // Get current user and signOut function from context
    const { user, update } = useAuth()
    const history = useHistory()

    useEffect(() => {
        console.log(user)
        nameRef.current.value = user.user_metadata.name ? user.user_metadata.name : ''
    }, [user])


    async function handleSubmit(e) {
        e.preventDefault()
        await setMessage({ show: true, color: 'yellow', value: 'Saving...' });

        // Get email and password input values
        const name = nameRef.current.value
        console.log(name);

        if (!(name)) {
            await setMessage({ show: true, color: 'red', value: 'Nickname empty' });
            return;
        }

        // Calls `signIn` function from the context
        const { user, error } = await update({ name })
        console.log({ user, error })

        if (error) {
            await setMessage({ show: true, color: 'red', value: error });
        } else {
            await setMessage({ show: true, color: 'green', value: 'User saved successfully!' });
        }
    }

    return (
        <div>
            <h3>Profile!</h3>
            <p>Welcome, {user?.user_metadata.name}!</p>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="input-email">Name</label>
                    <input id="input-nickname" type="text" ref={nameRef} />

                    {/* <label htmlFor="input-password">Password</label>
                    <input id="input-password" type="password" ref={passwordRef} /> */}
                    <button type="submit">Save</button>
                    {message.show &&
                        <div style={{ height: '3em', backgroundColor: message.color }}>
                            {message.value}
                        </div>
                    }
                    <br />

                </form>

            </div>
        </div>
    )
}