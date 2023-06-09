import { css } from '@emotion/css'
import SideBar from '../components/SideBar'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'

const dashboardPageWrapper = css`
    height: 100vh;
    background-color: #f0f0f0;
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
    z-index: 999;
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
