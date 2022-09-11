import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { SignInSection } from './SignInSection'
import { Signup } from './Signup'
import { Login } from './Login'
import { Logout } from './Logout'
import { Frontpage } from './Frontpage'
import { SupabaseFeatures } from './SupabaseFeatures'
import { Profile } from './Profile'
import { ForgottenPassword } from './ForgottenPassword'
import { ResetPassword } from './ResetPassword'
import { Dashboard } from './Dashboard'
import { AuthProvider } from '../contexts/Auth'
import { PrivateRoute } from './PrivateRoute'

export function App() {
  return (
    <div>

      
      <Router>
        <AuthProvider>
        <SignInSection />
        <h1 style={{marginTop: 0}}>supabase-auth-react</h1>
          <Switch>
            <Route exact path="/" component={Frontpage} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/supabasefeatures" component={SupabaseFeatures} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/forgottenpassword" component={ForgottenPassword} />
            <Route path="/resetpassword" component={ResetPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}
