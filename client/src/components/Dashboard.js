
import { useHistory } from 'react-router'
import { useAuth } from '../contexts/Auth'
import { SignInSection } from './SignInSection'

export function Dashboard() {
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
      <p>This is a private page!</p>
      <p>Welcome, {user.user_metadata.name}!</p>

    </div>
  )
}