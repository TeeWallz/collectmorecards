import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import './SignInSection.css'

export function SignInSection() {
    const { user, signOut } = useAuth()

    let links = '';

    if (user) {
        links = (
            <>
            <div className={'menu_button'}><Link to="/dashboard">Dashboard</Link></div>
                <div className={'menu_button'}><Link to="/supabasefeatures">Supabase Features</Link></div>
                <div className={'menu_button'}><Link to="/profile">Profile</Link></div>
                <div className={'menu_button'}><Link to="/logout">Log Out</Link></div>
                <img className={'avatar'} src={user?.user_metadata.avatar_url}></img>
            </>
        )
    }
    else {
        links = (
            <>
                <div className={'menu_button'}><Link to="/login">Log In</Link></div>
                <div className={'menu_button'}><Link to="/signup">Sign Up</Link></div>
            </>
        )
    }


    return (
        <>
            <div className={'menu'}>
                <div className={'menu_button'}><Link to="/">Home</Link></div>
                {links}
            </div>

        </>

    )
}