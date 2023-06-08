import { Link } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import styles from './Login.module.css'
import { useLogin } from '../../hooks/useLogin'
import { clearAllToasts, showErrorToast } from '../../utils/toastUtils'
import CustomButton from '../CustomButton'
import CustomInputText from '../CustomInputText'
import CustomLink from '../CustomLink'
import CustomWelcomeMessage from '../CustomWelcomeMessage'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        clearAllToasts()
        await login(username, password)
        if (error) {
            showErrorToast(error)
        }
    }

    return (
        <div id={styles.loginWrapper}>
            <CustomLink linkText="Sign up" linkTo="/signUp" />

            <form
                id={styles.loginForm}
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <CustomWelcomeMessage
                    mainText="Welcome to BMP"
                    otherText="Please login"
                />

                <CustomInputText
                    labelText="Username"
                    inputName="username"
                    placeholderText="Username"
                    value={username}
                    onChangeHandler={setUsername}
                />

                <CustomInputText
                    labelText="Password"
                    inputName="password"
                    placeholderText="Password"
                    value={password}
                    onChangeHandler={setPassword}
                    inputType="password"
                    isInputTypePassword={true}
                />

                <CustomButton
                    buttonType="submit"
                    buttonText="Login"
                    loading={isLoading}
                />
            </form>
            <div id={styles.forgotPassword}>
                <Link to="/forgotPassword">Forgot your password?</Link>
            </div>
        </div>
    )
}
