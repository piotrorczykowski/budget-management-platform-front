import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../components/dashboard/Dashboard'
import Login from '../components/login/Login'
import HomePage from '../pages/homePage/HomePage'
import SignUp from '../components/signUp/SignUp'
import ForgotPassword from '../components/forgotPassword/ForgotPassword'
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
            <Route path="/" element={RedirectNotAuthUser(<Dashboard />)} />
            <Route element={<HomePage />}>
                <Route path="/signIn" element={RedirectAuthUser(<Login />)} />
                <Route path="/signUp" element={RedirectAuthUser(<SignUp />)} />
                <Route
                    path="/forgotPassword"
                    element={RedirectAuthUser(<ForgotPassword />)}
                />
            </Route>
        </Routes>
    )
}

export default Router
