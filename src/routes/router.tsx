import { Route, Routes } from 'react-router-dom'
import Dashboard from '../components/dashboard/Dashboard'
import Login from '../components/login/Login'
import HomePage from '../pages/homePage/HomePage'
import SignUp from '../components/signUp/SignUp'
import ForgotPassword from '../components/forgotPassword/ForgotPassword'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route element={<HomePage />}>
                <Route path="/signIn" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
            </Route>
        </Routes>
    )
}

export default Router
