import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINTS } from '../api'
import { sendPost } from '../api/axios'
import CustomButton from '../components/CustomButton'
import CustomInputText from '../components/CustomInputText'
import CustomLink from '../components/CustomLink'
import CustomWelcomeMessage from '../components/CustomWelcomeMessage'
import AlignCenterWrapper from '../components/AlignCenterWrapper'
import { showErrorToast } from '../utils/toastUtils'

export default function ForgotPasswordPage() {
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
            await sendPost(ENDPOINTS.forgotPassword, {
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
        <AlignCenterWrapper paddingTop="25vh">
            <CustomLink linkText="Login" linkTo="/signIn" />

            {isEmailSent ? (
                <AlignCenterWrapper>
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
                </AlignCenterWrapper>
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
        </AlignCenterWrapper>
    )
}
