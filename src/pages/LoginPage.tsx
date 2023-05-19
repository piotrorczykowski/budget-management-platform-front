import Login from '../components/login/Login'
import WelcomePanel from '../components/welcomePanel/WelcomePanel'
import './LoginPage.css'

function LoginPage() {
    return (
        <div id="loginPageWrapper">
            <div id="leftPanel">
                <WelcomePanel />
            </div>
            <div id="rightPanel">
                <Login />
            </div>
        </div>
    )
}

export default LoginPage
