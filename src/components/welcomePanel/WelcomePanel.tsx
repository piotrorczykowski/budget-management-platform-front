import { MdOutlineToll } from 'react-icons/md'
import styles from './WelcomePanel.module.css'
import { Link } from 'react-router-dom'

export default function WelcomePanel() {
    return (
        <div id={styles.welcomePanelWrapper}>
            <Link id={styles.homePageLink} to="/">
                <span id={styles.appLogo}>
                    <MdOutlineToll id={styles.logo} /> BMP
                </span>
            </Link>
            <p id={styles.appName}>
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
