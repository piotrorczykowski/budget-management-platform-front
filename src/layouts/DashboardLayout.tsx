import { css } from '@emotion/css'
import SideBar from '../components/SideBar'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'

const dashboardPageWrapper = css`
    height: 100vh;
    display: flex;
    flex-direction: row;
`

const sideBarWrapper = css`
    background-color: black;
    color: white;
    width: 300px;
    padding: 2em;
`

const styledOutletWrapper = css`
    width: 100%;
`

export default function DashboardLayout() {
    return (
        <div className={dashboardPageWrapper}>
            <div className={sideBarWrapper}>
                <SideBar />
            </div>
            <div className={styledOutletWrapper}>
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    )
}
