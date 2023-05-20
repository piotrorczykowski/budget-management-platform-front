import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
    return (
        <div id="loginWrapper">
            <div id="signUp">
                <Link id="signUpLink" to="/signUp">
                    Sign up
                </Link>
            </div>
            <form id="loginForm">
                <div>
                    <p id="mainMessage">Welcome to BMP</p>
                    <p id="secondMessage">Please login in</p>
                </div>
                <input
                    className="inputField"
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    required
                />

                <input
                    className="inputField"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    required
                />

                <button id="submitBtn" type="submit">
                    Log in
                </button>
            </form>
            <div id="forgotPassword">
                <Link id="forgotPasswordLink" to="/forgotPassword">
                    Forgot your password?
                </Link>
            </div>
        </div>
    )
}
