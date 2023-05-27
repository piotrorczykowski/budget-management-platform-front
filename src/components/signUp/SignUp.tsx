import { Link } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { clearAllToasts } from '../../utils/toastUtils'
import { ToastContainer } from 'react-toastify'
import styles from './SignUp.module.css'

export default function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    // const { login, error, isLoading } = useLogin()

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        clearAllToasts()
        // await login(username, password)
        // if (error) {
        //     showErrorToast(error)
        // }
    }

    return (
        <div id={styles.signUpWrapper}>
            <div id={styles.login}>
                <Link id={styles.loginLink} to="/signIn">
                    Login
                </Link>
            </div>

            <form
                id={styles.signUpForm}
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <div>
                    <p id={styles.mainMessage}>Register</p>
                    <p id={styles.secondMessage}>Create your account</p>
                </div>
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

                <input
                    className={styles.inputField}
                    type="email"
                    placeholder="Email"
                    name="email"
                    autoComplete="new-email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <div id={styles.passwordField}>
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

                <div id={styles.passwordField}>
                    <input
                        className={styles.inputField}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        autoComplete="new-confirmPassword"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    {showConfirmPassword ? (
                        <AiFillEyeInvisible
                            id={styles.icon}
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        />
                    ) : (
                        <AiFillEye
                            id={styles.icon}
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        />
                    )}
                </div>

                <button
                    id={styles.submitBtn}
                    // disabled={isLoading}
                    type="submit"
                >
                    Register
                </button>
            </form>
            <ToastContainer />
        </div>
    )
}
