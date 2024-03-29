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
import DashboardPage from '../pages/DashboardPage'
import AccountsPage from '../pages/accountsPage/AccountsPage'
import RecordsPage from '../pages/recordsPage/RecordsPage'
import BudgetsPage from '../pages/budgetsPage/BudgetsPage'
import AnalyticsPage from '../pages/AnalyticsPage'
import SettingsPage from '../pages/settingsPage/SettingsPage'
import AdminPage from '../pages/adminPage/AdminPage'
import { UserRole } from '../types/enums'
import AccountBalancePage from '../pages/AccountBalancePage'

const RedirectNotAuthUser = (element: JSX.Element): JSX.Element => {
    const accessToken = localStorage.getItem('accessToken')
    return accessToken ? element : <Navigate to="/signIn" />
}

const RedirectAuthUser = (element: JSX.Element): JSX.Element => {
    const { accessToken } = useAuthContext()
    return accessToken ? <Navigate to="/" /> : element
}

const RedirectNonAdminUser = (element: JSX.Element): JSX.Element => {
    const userRole = localStorage.getItem('role')
    return userRole !== UserRole.ADMIN ? <Navigate to="/" /> : element
}

const Router = () => {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route
                    path="/"
                    element={RedirectNotAuthUser(<DashboardPage />)}
                />
                <Route
                    path="/accounts"
                    element={RedirectNotAuthUser(<AccountsPage />)}
                />
                <Route
                    path="/account-balance/:id"
                    element={RedirectNotAuthUser(<AccountBalancePage />)}
                />
                <Route
                    path="/records"
                    element={RedirectNotAuthUser(<RecordsPage />)}
                />
                <Route
                    path="/budgets"
                    element={RedirectNotAuthUser(<BudgetsPage />)}
                />
                <Route
                    path="/analytics"
                    element={RedirectNotAuthUser(<AnalyticsPage />)}
                />
                <Route
                    path="/admin"
                    element={RedirectNonAdminUser(<AdminPage />)}
                />
                <Route
                    path="/settings"
                    element={RedirectNotAuthUser(<SettingsPage />)}
                />
            </Route>

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
