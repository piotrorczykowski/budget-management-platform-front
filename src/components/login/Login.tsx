import { Link } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import styles from './Login.module.css'
import { useLogin } from '../../hooks/useLogin'
import { clearAllToasts, showErrorToast } from '../../utils/toastUtils'
import CustomButton from '../CustomButton'
import CustomInputText from '../CustomInputText'

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
            <div id={styles.signUp}>
                <Link id={styles.signUpLink} to="/signUp">
                    Sign up
                </Link>
            </div>
            <form
                id={styles.loginForm}
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <div>
                    <p id={styles.mainMessage}>Welcome to BMP</p>
                    <p id={styles.secondMessage}>Please login</p>
                </div>

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
