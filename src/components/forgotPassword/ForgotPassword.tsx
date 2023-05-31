import { useState } from 'react'
import styles from './ForgotPassword.module.css'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [loading, setLoading] = useState(false)

    const resetPassword = async (): Promise<void> => {
        setLoading(true)

        await validate(email)
        if (!!emailError.length) {
            setLoading(false)
            return
        }

        // TODO add resetting password
        setLoading(false)
    }

    const validate = async (email: string): Promise<void> => {
        setEmailError('')

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        if (!email.length) {
            setEmailError('Email is required!')
        } else if (!regex.test(email)) {
            setEmailError('This is not a valid email format!')
        }
    }

    return (
        <div id={styles.forgotPasswordWrapper}>
            <div id={styles.login}>
                <Link id={styles.loginLink} to="/signIn">
                    Login
                </Link>
            </div>
            <div id={styles.forgotPassword}>
                <p id={styles.mainMessage}>Forgot Password?</p>
                <p id={styles.secondMessage}>
                    No worries, we'll send you reset instructions
                </p>

                <div id={styles.emailInput}>
                    <label className={styles.label} htmlFor="email">
                        Email
                    </label>
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
                    <p className={styles.errorMessage}>{emailError}</p>
                </div>

                <button
                    className={styles.customBtn}
                    disabled={loading}
                    type="button"
                    onClick={resetPassword}
                >
                    Reset Password
                </button>
            </div>
        </div>
    )
}
