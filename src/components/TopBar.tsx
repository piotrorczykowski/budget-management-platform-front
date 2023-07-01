import UserProfile from './UserProfile'
import { css } from '@emotion/css'

const topBarWrapper = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: #ffffff;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2);
    z-index: 999;
`

const pageName = css`
    font-size: 26px;
    font-weight: 600;
    padding: 0.5em;
`

const styledRightSide = css`
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: 1em;
`

export default function TopBar({
    children,
    pageNameText,
}: {
    children?: JSX.Element[] | JSX.Element
    pageNameText: string
}) {
    return (
        <div className={topBarWrapper}>
            <p className={pageName}>{pageNameText}</p>
            <div className={styledRightSide}>
                {children}
                <UserProfile />
            </div>
        </div>
    )
}
