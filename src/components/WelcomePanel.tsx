import { css } from '@emotion/css'
import { Link } from 'react-router-dom'
import { MdOutlineToll } from 'react-icons/md'

const styledWelcomePanelWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #040605;
    height: 100vh;
`

const styledAppLogo = css`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 140px;
    color: #ffffff;
    font-size: 40px;
    font-weight: 600;
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
            <Link className={styledAppLogo} to="/">
                <MdOutlineToll size="50px" /> BMP
            </Link>
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
