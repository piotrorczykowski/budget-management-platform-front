import { Outlet } from 'react-router-dom'
import WelcomePanel from '../components/WelcomePanel'
import { ToastContainer } from 'react-toastify'
import { css } from '@emotion/css'

const styledHomepageWrapper = css`
    height: 100vh;
    display: flex;
    flex-direction: row;
`

const styledPanel = css`
    height: 100vh;
    width: 50vw;
`

function HomePage() {
    return (
        <div className={styledHomepageWrapper}>
            <div className={styledPanel}>
                <WelcomePanel />
            </div>
            <div className={styledPanel}>
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    )
}

export default HomePage
