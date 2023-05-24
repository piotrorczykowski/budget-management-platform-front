import { MdOutlineToll } from 'react-icons/md'
import './WelcomePanel.css'

export default function WelcomePanel() {
    return (
        <div id="welcomePanelWrapper">
            <span id="appLogo">
                <MdOutlineToll id="logo" /> BMP
            </span>
            <p id="appName">
                BUDGET
                <br />
                MANAGEMENT
                <br />
                PLATFORM
                <br />
            </p>
        </div>
    )
}
