import { Link } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Login.css'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { useLogin } from '../../hooks/useLogin'

export default function Login() {
    const showErrorToast = (message: string) => {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 500,
            pauseOnHover: false,
            hideProgressBar: true,
        })
    }
    const clearAllToasts = () => toast.dismiss()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        clearAllToasts()
        await login(username, password)
        if (error) {
            showErrorToast(error)
        }
    }

    return (
        <div id="loginWrapper">
            <div id="signUp">
                <Link id="signUpLink" to="/signUp">
                    Sign up
                </Link>
            </div>
            <form id="loginForm" onSubmit={handleSubmit}>
                <div>
                    <p id="mainMessage">Welcome to BMP</p>
                    <p id="secondMessage">Please login in</p>
                </div>
                <input
                    className="inputField"
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />

                <div id="passwordField">
                    <input
                        className="inputField"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {showPassword ? (
                        <AiFillEyeInvisible
                            id="icon"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    ) : (
                        <AiFillEye
                            id="icon"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    )}
                </div>

                <button id="submitBtn" disabled={isLoading} type="submit">
                    Log in
                </button>
            </form>
            <div id="forgotPassword">
                <Link id="forgotPasswordLink" to="/forgotPassword">
                    Forgot your password?
                </Link>
            </div>
            <ToastContainer />
        </div>
    )
}
