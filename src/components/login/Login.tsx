import { Link, useNavigate } from 'react-router-dom'
import { SyntheticEvent, useState } from 'react'
import { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from '../../api/axios'
import './Login.css'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

export default function Login() {
    const navigate = useNavigate()
    const showErrorToast = (message: string) => {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 500,
            pauseOnHover: false,
            hideProgressBar: true,
        })
    }
    const clearAllToasts = () => toast.dismiss()

    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    })

    const handleSubmit = async (event: SyntheticEvent) => {
        clearAllToasts()
        event.preventDefault()

        const { username, password } = document.forms[0]
        const usernameValue: string = username.value
        const passwordValue: string = password.value

        try {
            const res: AxiosResponse = await api.post('/auth/signIn', {
                username: usernameValue,
                password: passwordValue,
            })

            localStorage.setItem('accessToken', res.data.accessToken)
            navigate('/')
        } catch (e: any) {
            showErrorToast('User not found!')
        }
    }

    return (
        <div id="loginWrapper">
            <div id="signUp">
                <Link id="signUpLink" to="/signUp">
                    Sign up
                </Link>
            </div>
            <form id="loginForm" onSubmit={handleSubmit}>
                <div>
                    <p id="mainMessage">Welcome to BMP</p>
                    <p id="secondMessage">Please login in</p>
                </div>
                <input
                    className="inputField"
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    required
                    onChange={(e) =>
                        setValues({ ...values, username: e.target.value })
                    }
                />

                <div id="passwordField">
                    <input
                        className="inputField"
                        type={values.showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        name="password"
                        required
                        onChange={(e) =>
                            setValues({ ...values, password: e.target.value })
                        }
                    />
                    {values.showPassword ? (
                        <AiFillEyeInvisible
                            id="icon"
                            onClick={() =>
                                setValues({
                                    ...values,
                                    showPassword: !values.showPassword,
                                })
                            }
                        />
                    ) : (
                        <AiFillEye
                            id="icon"
                            onClick={() =>
                                setValues({
                                    ...values,
                                    showPassword: !values.showPassword,
                                })
                            }
                        />
                    )}
                </div>

                <button id="submitBtn" type="submit">
                    Log in
                </button>
            </form>
            <div id="forgotPassword">
                <Link id="forgotPasswordLink" to="/forgotPassword">
                    Forgot your password?
                </Link>
            </div>
            <ToastContainer />
        </div>
    )
}
