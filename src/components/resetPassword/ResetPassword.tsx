import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './ResetPassword.module.css'
import { SyntheticEvent, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
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

export default function ResetPassword() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState(InitialValues)
    const [formErrors, setFormErrors] = useState(InitialValues)
    const [isPasswordChanged, setIsPasswordChanged] = useState(false)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        clearAllToasts()
        setLoading(true)

        const errors: FormInputsType = await validate(formValues)
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
                password: formValues.password,
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
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
                    <button
                        className={styles.customBtn}
                        type="button"
                        onClick={() => navigate('/signIn')}
                    >
                        Login
                    </button>
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

                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="password">
                            New Password
                        </label>
                        <div id={styles.passwordField}>
                            <input
                                className={styles.inputField}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                name="password"
                                autoComplete="new-password"
                                required
                                onChange={handleChange}
                                value={formValues.password}
                            />
                            {showPassword ? (
                                <AiFillEyeInvisible
                                    id={styles.icon}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            ) : (
                                <AiFillEye
                                    id={styles.icon}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            )}
                        </div>
                        <p className={styles.errorMessage}>
                            {formErrors.password}
                        </p>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label
                            className={styles.label}
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <div id={styles.passwordField}>
                            <input
                                className={styles.inputField}
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                autoComplete="new-confirmPassword"
                                required
                                onChange={handleChange}
                                value={formValues.confirmPassword}
                            />
                            {showConfirmPassword ? (
                                <AiFillEyeInvisible
                                    id={styles.icon}
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                />
                            ) : (
                                <AiFillEye
                                    id={styles.icon}
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                />
                            )}
                        </div>
                        <p className={styles.errorMessage}>
                            {formErrors.confirmPassword}
                        </p>
                    </div>

                    <button
                        className={styles.customBtn}
                        disabled={loading}
                        type="submit"
                    >
                        Update Password
                    </button>
                </form>
            )}

            <ToastContainer />
        </div>
    )
}
