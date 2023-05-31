import { Link } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './Login.module.css'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { useLogin } from '../../hooks/useLogin'
import { clearAllToasts, showErrorToast } from '../../utils/toastUtils'

export default function Login() {
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
        <div id={styles.loginWrapper}>
            <div id={styles.signUp}>
                <Link id={styles.signUpLink} to="/signUp">
                    Sign up
                </Link>
            </div>
            <form
                id={styles.loginForm}
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <div>
                    <p id={styles.mainMessage}>Welcome to BMP</p>
                    <p id={styles.secondMessage}>Please login</p>
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.label} htmlFor="username">
                        Username
                    </label>
                    <input
                        className={styles.inputField}
                        type="text"
                        placeholder="Username"
                        name="username"
                        autoComplete="new-username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>

                <div id={styles.passwordField} className={styles.inputWrapper}>
                    <label className={styles.label} htmlFor="password">
                        Password
                    </label>
                    <input
                        className={styles.inputField}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="password"
                        autoComplete="new-password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {showPassword ? (
                        <AiFillEyeInvisible
                            id={styles.icon}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    ) : (
                        <AiFillEye
                            id={styles.icon}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    )}
                </div>

                <button
                    id={styles.submitBtn}
                    disabled={isLoading}
                    type="submit"
                >
                    Login
                </button>
            </form>
            <div id={styles.forgotPassword}>
                <Link
                    // id={styles.forgotPasswordLink}
                    to="/forgotPassword"
                >
                    Forgot your password?
                </Link>
            </div>
            <ToastContainer />
        </div>
    )
}
