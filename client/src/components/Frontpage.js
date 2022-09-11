
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import { SignInSection } from './SignInSection'

export function Frontpage() {
    // Get current user and signOut function from context
    const { user, signOut } = useAuth()

    const history = useHistory()

    async function handleSignOut() {
        // Ends user session
        await signOut()

        // Redirects the user to Login page
        history.push('/login')
    }

    return (
        <div>
            <p>This is a front page</p>
            The user is <b>{user ? 'currently' : 'not'}</b> logged in {user && <>as {user?.user_metadata.name}</> }.


        </div>
    )
}