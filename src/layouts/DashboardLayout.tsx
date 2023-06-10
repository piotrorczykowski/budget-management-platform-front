import Dashboard from '../components/Dashboard'
import { css } from '@emotion/css'
import SideBar from '../components/SideBar'

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

const dashboardWrapper = css`
    width: 100%;
    padding: 2em;
`

export default function DashboardLayout() {
    return (
        <div className={dashboardPageWrapper}>
            <div className={sideBarWrapper}>
                <SideBar />
            </div>
            <div className={dashboardWrapper}>
                <Dashboard />
            </div>
        </div>
    )
}
