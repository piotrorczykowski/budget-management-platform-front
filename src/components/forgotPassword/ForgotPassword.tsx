import { useState } from 'react'
import styles from './ForgotPassword.module.css'
import { useNavigate } from 'react-router-dom'
import { ENDPOINTS } from '../../api'
import api from '../../api/axios'
import { showErrorToast } from '../../utils/toastUtils'
import CustomButton from '../CustomButton'
import CustomInputText from '../CustomInputText'
import CustomLink from '../CustomLink'
import CustomWelcomeMessage from '../CustomWelcomeMessage'

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
            <CustomLink linkText="Login" linkTo="/signIn" />

            <div id={styles.forgotPassword}>
                {isEmailSent ? (
                    <div id={styles.emailSent}>
                        <CustomWelcomeMessage
                            mainText="Reset Password"
                            otherText="We have sent you an email with instructions on how
                            to reset your password"
                        />

                        <CustomButton
                            buttonText="Homepage"
                            loading={loading}
                            onClickHandler={() => navigate('/signIn')}
                        />
                    </div>
                ) : (
                    <div>
                        <CustomWelcomeMessage
                            mainText="Forgot Password?"
                            otherText="No worries, we'll send you reset instructions"
                        />

                        <CustomInputText
                            labelText="Email"
                            inputName="email"
                            placeholderText="Email"
                            value={email}
                            onChangeHandler={setEmail}
                            errorMessage={emailError}
                            inputType="email"
                        />

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
