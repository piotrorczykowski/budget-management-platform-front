import { Link } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import { css } from '@emotion/css'
import { useLogin } from '../hooks/useLogin'
import CustomButton from '../components/CustomButton'
import CustomInputText from '../components/CustomInputText'
import CustomLink from '../components/CustomLink'
import CustomWelcomeMessage from '../components/CustomWelcomeMessage'
import AlignCenterWrapper from '../components/AlignCenterWrapper'
import { clearAllToasts } from '../utils/toastUtils'

const styledForgotPasswordLink = css`
    font-weight: 500;
    color: #000000;
    margin-top: 30px;
`

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading } = useLogin()

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        clearAllToasts()
        await login(username, password)
    }

    return (
        <AlignCenterWrapper paddingTop="20vh">
            <CustomLink linkText="Sign up" linkTo="/signUp" />

            <form onSubmit={handleSubmit} autoComplete="off">
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
            <div className={styledForgotPasswordLink}>
                <Link to="/forgotPassword">Forgot your password?</Link>
            </div>
        </AlignCenterWrapper>
    )
}
