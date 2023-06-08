import { useState } from 'react'
import styles from './ForgotPassword.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { ENDPOINTS } from '../../api'
import api from '../../api/axios'
import { showErrorToast } from '../../utils/toastUtils'
import CustomButton from '../CustomButton'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [isEmailSent, setIsEmailSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const resetPassword = async (): Promise<void> => {
        setLoading(true)

        const emailError: string = await validate(email)
        setEmailError(emailError)
        if (!!emailError.length) {
            setLoading(false)
            return
        }

        try {
            await api.post(ENDPOINTS.forgotPassword, {
                email: email,
            })

            setIsEmailSent(true)
            setLoading(false)
        } catch (e: any) {
            showErrorToast(e.response.data.Error)
            setLoading(false)
        }
    }

    const validate = async (email: string): Promise<string> => {
        let emailError: string = ''

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        if (!email.length) {
            emailError = 'Email is required!'
        } else if (!regex.test(email)) {
            emailError = 'This is not a valid email format!'
        }

        return emailError
    }

    return (
        <div id={styles.forgotPasswordWrapper}>
            <div id={styles.login}>
                <Link id={styles.loginLink} to="/signIn">
                    Login
                </Link>
            </div>
            <div id={styles.forgotPassword}>
                {isEmailSent ? (
                    <div id={styles.emailSent}>
                        <p className={styles.mainMessage}>Reset Password</p>
                        <p className={styles.secondMessage}>
                            We have sent you an email with instructions on how
                            to reset your password
                        </p>

                        <CustomButton
                            buttonText="Homepage"
                            loading={loading}
                            onClickHandler={() => navigate('/signIn')}
                        />
                    </div>
                ) : (
                    <div>
                        <p className={styles.mainMessage}>Forgot Password?</p>
                        <p className={styles.secondMessage}>
                            No worries, we'll send you reset instructions
                        </p>

                        <div className={styles.inputWrapper}>
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

                        <CustomButton
                            buttonText="Reset Password"
                            loading={loading}
                            onClickHandler={resetPassword}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
