import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../components/dashboard/Dashboard'
import Login from '../components/login/Login'
import HomePage from '../pages/homePage/HomePage'
import SignUp from '../components/signUp/SignUp'
import ForgotPassword from '../components/forgotPassword/ForgotPassword'
import { useAuthContext } from '../hooks/useAuthContext'

const Router = () => {
    const { user } = useAuthContext()

    return (
        <Routes>
            <Route
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/signIn" />}
            />
            <Route element={<HomePage />}>
                <Route
                    path="/signIn"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/signUp"
                    element={user ? <Navigate to="/" /> : <SignUp />}
                />
                <Route
                    path="/forgotPassword"
                    element={user ? <Navigate to="/" /> : <ForgotPassword />}
                />
            </Route>
        </Routes>
    )
}

export default Router
