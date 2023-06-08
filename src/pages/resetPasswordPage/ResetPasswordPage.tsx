import { useNavigate, useSearchParams } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import { css } from '@emotion/css'
import _ from 'lodash'
import api from '../../api/axios'
import { ENDPOINTS } from '../../api'
import CustomButton from '../../components/CustomButton'
import CustomInputText from '../../components/CustomInputText'
import CustomWelcomeMessage from '../../components/CustomWelcomeMessage'
import AlignCenterWrapper from '../../components/AlignCenterWrapper'
import { InitialValues } from './@types/constants'
import { FormInputsType } from './@types'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../../utils/toastUtils'

const styledForm = css`
    margin-top: 20vh;
`

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [formErrors, setFormErrors] = useState(InitialValues)
    const [isPasswordChanged, setIsPasswordChanged] = useState(false)

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        clearAllToasts()
        setLoading(true)

        const errors: FormInputsType = await validate({
            password,
            confirmPassword,
        })
        setFormErrors(errors)

        const isFormValid: boolean = Object.values(errors).every(
            (errorMessage) => !errorMessage.length
        )

        if (!isFormValid) {
            setLoading(false)
            return
        }

        const token: string = searchParams.get('token') as string
        try {
            await api.post(ENDPOINTS.resetPassword, {
                token: token,
                password: password,
            })

            showSuccessToast('Password changed successfully')
            setIsPasswordChanged(true)
            setLoading(false)
        } catch (e: any) {
            showErrorToast(e.response.data.Error)
            setLoading(false)
        }
    }

    const validate = async (
        values: FormInputsType
    ): Promise<FormInputsType> => {
        const errors: FormInputsType = { ...InitialValues }

        for (const key in errors) {
            if (!values[key as keyof FormInputsType]) {
                errors[key as keyof FormInputsType] = `${_.startCase(
                    key
                )} is required!`
            }

            if (values[key as keyof FormInputsType].length < 5) {
                errors[key as keyof FormInputsType] = `${_.startCase(
                    key
                )} must be more than 5 characters`
            }
        }

        if (
            !(values.password === values.confirmPassword) &&
            !!values.password.length &&
            !!values.confirmPassword.length
        ) {
            errors.password = 'Password and Confirm Password must be same'
            errors.confirmPassword =
                'Password and Confirm Password must be same'
        }

        return errors
    }

    return (
        <AlignCenterWrapper>
            {isPasswordChanged ? (
                <AlignCenterWrapper paddingTop="35vh">
                    <CustomWelcomeMessage
                        mainText="Password Reset Successfully!"
                        otherText="You can now login."
                    />

                    <CustomButton
                        buttonText="Login"
                        onClickHandler={() => navigate('/signIn')}
                    />
                </AlignCenterWrapper>
            ) : (
                <form
                    className={styledForm}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <CustomWelcomeMessage
                        mainText="Reset Password"
                        otherText="Enter your new password:"
                    />

                    <CustomInputText
                        labelText="New Password"
                        inputName="password"
                        placeholderText="New Password"
                        value={password}
                        onChangeHandler={setPassword}
                        errorMessage={formErrors.password}
                        inputType="password"
                        isInputTypePassword={true}
                    />

                    <CustomInputText
                        labelText="Confirm Password"
                        inputName="confirmPassword"
                        placeholderText="Confirm Password"
                        value={confirmPassword}
                        onChangeHandler={setConfirmPassword}
                        errorMessage={formErrors.confirmPassword}
                        inputType="password"
                        isInputTypePassword={true}
                    />

                    <CustomButton
                        buttonText="Update Password"
                        loading={loading}
                        buttonType="submit"
                    />
                </form>
            )}
        </AlignCenterWrapper>
    )
}
