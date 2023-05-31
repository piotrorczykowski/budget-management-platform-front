import { Link } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../../utils/toastUtils'
import { ToastContainer } from 'react-toastify'
import _ from 'lodash'
import styles from './SignUp.module.css'
import api from '../../api/axios'
import { ENDPOINTS } from '../../api'
import { FormInputsType } from './@types/index'
import { InitialValues } from './@types/constants'

export default function SignUp() {
    const [formValues, setFormValues] = useState(InitialValues)
    const [formErrors, setFormErrors] = useState(InitialValues)
    const [isSubmit, setIsSubmit] = useState(false)

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

        try {
            await api.post(ENDPOINTS.signUp, {
                username: formValues.username,
                fullName: formValues.fullName,
                email: formValues.email,
                password: formValues.password,
            })

            showSuccessToast('Account created successfully')
            setIsSubmit(true)
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

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        if (!regex.test(values.email) && !!values.email.length) {
            errors.email = 'This is not a valid email format!'
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

    const resendVerificationEmail = () => {
        // TODO add resending email
        console.log('RESEND EMAIL')
    }

    return (
        <div id={styles.signUpWrapper}>
            <div id={styles.login}>
                <Link id={styles.loginLink} to="/signIn">
                    Login
                </Link>
            </div>

            {isSubmit ? (
                <div id={styles.submittedForm}>
                    <p id={styles.mainSuccessMessage}>
                        Verify your email address
                    </p>
                    <p id={styles.secondSuccessMessage}>
                        In order to start using your BMP account, please verify
                        your email address: <br />
                        <span id={styles.email}>{formValues.email}</span>
                    </p>
                    <button
                        className={styles.customBtn}
                        disabled={loading}
                        type="button"
                        onClick={resendVerificationEmail}
                    >
                        Send Verification Email
                    </button>
                </div>
            ) : (
                <form
                    id={styles.signUpForm}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <div>
                        <p id={styles.mainMessage}>Register</p>
                        <p id={styles.secondMessage}>Create your account</p>
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
                            onChange={handleChange}
                            value={formValues.username}
                        />
                        <p className={styles.errorMessage}>
                            {formErrors.username}
                        </p>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="fullName">
                            FullName
                        </label>
                        <input
                            className={styles.inputField}
                            type="text"
                            placeholder="FullName"
                            name="fullName"
                            autoComplete="new-fullName"
                            required
                            onChange={handleChange}
                            value={formValues.fullName}
                        />
                        <p className={styles.errorMessage}>
                            {formErrors.fullName}
                        </p>
                    </div>

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
                            onChange={handleChange}
                            value={formValues.email}
                        />
                        <p className={styles.errorMessage}>
                            {formErrors.email}
                        </p>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label className={styles.label} htmlFor="password">
                            Password
                        </label>
                        <div id={styles.passwordField}>
                            <input
                                className={styles.inputField}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
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
                        Register
                    </button>
                </form>
            )}
            <ToastContainer />
        </div>
    )
}
