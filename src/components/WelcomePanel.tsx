import { css } from '@emotion/css'
import AppLogo from './AppLogo'

const styledWelcomePanelWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #040605;
    height: 100vh;
`

const styledAppLogo = css`
    position: absolute;
    left: 0.5em;
    top: 0.5em;
`

const styledAppName = css`
    color: #ffffff;
    font-size: 100px;
    font-weight: 600;
    margin-top: auto;
    margin-bottom: auto;
    line-height: 75%;
`

export default function WelcomePanel() {
    return (
        <div className={styledWelcomePanelWrapper}>
            <AppLogo className={styledAppLogo} />

            <p className={styledAppName}>
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
