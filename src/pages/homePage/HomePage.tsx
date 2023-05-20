import { Outlet } from 'react-router-dom'
import WelcomePanel from '../../components/welcomePanel/WelcomePanel'
import './HomePage.css'

function HomePage() {
    return (
        <div id="homePageWrapper">
            <div id="leftPanel">
                <WelcomePanel />
            </div>
            <div id="rightPanel">
                <Outlet />
            </div>
        </div>
    )
}

export default HomePage
