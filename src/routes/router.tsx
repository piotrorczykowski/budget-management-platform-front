import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/signUpPage/SignUpPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import NotFoundPage from '../pages/NotFoundPage'
import EmailVerificationPage from '../pages/EmailVerificationPage'
import ResetPasswordPage from '../pages/resetPasswordPage/ResetPasswordPage'
import HomeLayout from '../layouts/HomeLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import { useAuthContext } from '../hooks/useAuthContext'

const RedirectNotAuthUser = (element: JSX.Element): JSX.Element => {
    const { accessToken } = useAuthContext()
    return accessToken ? element : <Navigate to="/signIn" />
}

const RedirectAuthUser = (element: JSX.Element): JSX.Element => {
    const { accessToken } = useAuthContext()
    return accessToken ? <Navigate to="/" /> : element
}

const Router = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={RedirectNotAuthUser(<DashboardLayout />)}
            />
            <Route element={<HomeLayout />}>
                <Route
                    path="/signIn"
                    element={RedirectAuthUser(<LoginPage />)}
                />
                <Route
                    path="/signUp"
                    element={RedirectAuthUser(<SignUpPage />)}
                />
                <Route
                    path="/activateAccount"
                    element={RedirectAuthUser(<EmailVerificationPage />)}
                />
                <Route
                    path="/forgotPassword"
                    element={RedirectAuthUser(<ForgotPasswordPage />)}
                />
                <Route
                    path="/resetPassword"
                    element={RedirectAuthUser(<ResetPasswordPage />)}
                />
            </Route>
            <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
    )
}

export default Router
