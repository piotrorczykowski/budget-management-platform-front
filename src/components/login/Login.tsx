import { Link } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './Login.module.css'
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
        <div id={styles.loginWrapper}>
            <div id={styles.signUp}>
                <Link id={styles.signUpLink} to="/signUp">
                    Sign up
                </Link>
            </div>
            <form id={styles.loginForm} onSubmit={handleSubmit}>
                <div>
                    <p id={styles.mainMessage}>Welcome to BMP</p>
                    <p id={styles.secondMessage}>Please login in</p>
                </div>
                <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />

                <div id={styles.passwordField}>
                    <input
                        className={styles.inputField}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="password"
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
                    Log in
                </button>
            </form>
            <div id={styles.forgotPassword}>
                <Link id={styles.forgotPasswordLink} to="/forgotPassword">
                    Forgot your password?
                </Link>
            </div>
            <ToastContainer />
        </div>
    )
}
