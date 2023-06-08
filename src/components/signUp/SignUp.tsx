import { Link } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../../utils/toastUtils'
import _ from 'lodash'
import styles from './SignUp.module.css'
import api from '../../api/axios'
import { ENDPOINTS } from '../../api'
import { FormInputsType } from './@types/index'
import { InitialValues } from './@types/constants'
import CustomButton from '../CustomButton'
import CustomInputText from '../CustomInputText'
import CustomLink from '../CustomLink'

export default function SignUp() {
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [formErrors, setFormErrors] = useState(InitialValues)
    const [isSubmit, setIsSubmit] = useState(false)

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        clearAllToasts()
        setLoading(true)

        const errors: FormInputsType = await validate({
            username,
            fullName,
            email,
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

        try {
            await api.post(ENDPOINTS.signUp, {
                username,
                fullName,
                email,
                password,
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

    const resendVerificationEmail = async () => {
        setLoading(true)

        try {
            await api.post(ENDPOINTS.resendActivationEmail, { email })
            setLoading(false)
        } catch (e: any) {
            showErrorToast(e.response.data.Error)
            setLoading(false)
        }
    }

    return (
        <div id={styles.signUpWrapper}>
            <CustomLink linkText="Login" linkTo="/signIn" />

            {isSubmit ? (
                <div id={styles.submittedForm}>
                    <p id={styles.mainSuccessMessage}>
                        Verify your email address
                    </p>
                    <p id={styles.secondSuccessMessage}>
                        In order to start using your BMP account, please verify
                        your email address: <br />
                        <span id={styles.email}>{email}</span>
                    </p>

                    <CustomButton
                        buttonText="Send Verification Email"
                        loading={loading}
                        onClickHandler={resendVerificationEmail}
                    />
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

                    <CustomInputText
                        labelText="Username"
                        inputName="username"
                        placeholderText="Username"
                        value={username}
                        onChangeHandler={setUsername}
                        errorMessage={formErrors.username}
                    />

                    <CustomInputText
                        labelText="FullName"
                        inputName="fullName"
                        placeholderText="FullName"
                        value={fullName}
                        onChangeHandler={setFullName}
                        errorMessage={formErrors.fullName}
                    />

                    <CustomInputText
                        labelText="Email"
                        inputName="email"
                        placeholderText="Email"
                        value={email}
                        onChangeHandler={setEmail}
                        errorMessage={formErrors.email}
                        inputType="email"
                    />

                    <CustomInputText
                        labelText="Password"
                        inputName="password"
                        placeholderText="Password"
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
                        buttonText="Register"
                        loading={loading}
                        buttonType="submit"
                    />
                </form>
            )}
        </div>
    )
}
