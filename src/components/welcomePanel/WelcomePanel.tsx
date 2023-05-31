import { MdOutlineToll } from 'react-icons/md'
import styles from './WelcomePanel.module.css'

export default function WelcomePanel() {
    return (
        <div id={styles.welcomePanelWrapper}>
            <span id={styles.appLogo}>
                <MdOutlineToll id={styles.logo} /> BMP
            </span>
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
