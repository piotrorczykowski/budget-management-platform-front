import { IoChevronBackCircle } from 'react-icons/io5'
import UserProfile from './UserProfile'
import { css } from '@emotion/css'
import { useNavigate } from 'react-router-dom'

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

const styledIcon = css`
    margin-left: 1em;
    cursor: pointer;

    &:hover {
        opacity: 0.6;
    }
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
    showIcon = false,
    navigateTo = '',
}: {
    children?: JSX.Element[] | JSX.Element
    pageNameText: string
    showIcon?: boolean
    navigateTo?: string
}) {
    const navigate = useNavigate()

    return (
        <div className={topBarWrapper}>
            {showIcon && (
                <IoChevronBackCircle
                    size={40}
                    className={styledIcon}
                    onClick={() => navigate(navigateTo)}
                />
            )}
            <p className={pageName}>{pageNameText}</p>
            <div className={styledRightSide}>
                {children}
                <UserProfile />
            </div>
        </div>
    )
}
