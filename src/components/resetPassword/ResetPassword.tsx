import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './ResetPassword.module.css'
import { SyntheticEvent, useState } from 'react'
import _ from 'lodash'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../../utils/toastUtils'
import { FormInputsType } from './@types/index'
import { InitialValues } from './@types/constants'
import api from '../../api/axios'
import { ENDPOINTS } from '../../api'
import CustomButton from '../CustomButton'
import CustomInputText from '../CustomInputText'

export default function ResetPassword() {
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
        <div id={styles.resetPasswordWrapper}>
            {isPasswordChanged ? (
                <div id={styles.resetPasswordSuccessfully}>
                    <p className={styles.mainSuccessMessage}>
                        Password Reset Successfully!
                    </p>
                    <p className={styles.secondSuccessMessage}>
                        You can now login.
                    </p>

                    <CustomButton
                        buttonText="Login"
                        onClickHandler={() => navigate('/signIn')}
                    />
                </div>
            ) : (
                <form
                    id={styles.resetPasswordForm}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <div>
                        <p className={styles.mainSuccessMessage}>
                            Reset Password
                        </p>
                        <p className={styles.secondSuccessMessage}>
                            Enter your new password:
                        </p>
                    </div>

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
        </div>
    )
}
