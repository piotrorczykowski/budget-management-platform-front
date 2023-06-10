import UserProfile from './UserProfile'
import { css } from '@emotion/css'

const topBarWrapper = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 99%;
    height: 50px;
    padding: 0.5%;
    background-color: #ffffff;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2);
`

const pageName = css`
    font-size: 26px;
    font-weight: 600;
`

export default function TopBar({ pageNameText }: { pageNameText: string }) {
    return (
        <div className={topBarWrapper}>
            <p className={pageName}>{pageNameText}</p>
            <UserProfile />
        </div>
    )
}
