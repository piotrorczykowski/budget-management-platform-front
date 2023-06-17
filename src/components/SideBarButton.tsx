import { css } from '@emotion/css'
import { Link, useLocation } from 'react-router-dom'
import { MdSpaceDashboard, MdSettings } from 'react-icons/md'
import { IoLogOut, IoWallet } from 'react-icons/io5'
import { BiTransfer } from 'react-icons/bi'
import { FaCalculator } from 'react-icons/fa'
import { IoMdAnalytics } from 'react-icons/io'

const styledSideBarLink = (
    isCurrentButtonActive: boolean,
    shouldBeAtTheBottom: boolean = false
) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: flex-start;
    font-size: 18px;
    width: 250px;
    padding: 10px;
    margin-bottom: 10px;
    ${shouldBeAtTheBottom ? 'margin-top: auto;' : ''}

    ${isCurrentButtonActive
        ? 'color: #ffffff; background-color: #f0f0f040;'
        : 'color: #bebfbf;'}

    &:hover {
        color: #ffffff;
        background-color: #f0f0f040;
    }
`

const styledIcon = css`
    font-size: 22px;
    margin-right: 1em;
`

export default function SideBarButton({
    linkTo,
    buttonText,
    icon,
    shouldBeAtTheBottom = false,
    onClickHandler,
}: {
    linkTo: string
    buttonText: string
    icon: string
    shouldBeAtTheBottom?: boolean
    onClickHandler?: () => void
}) {
    const location = useLocation()
    const pathName: string = location.pathname
    const isCurrentButtonActive: boolean =
        pathName === `/${buttonText.toLowerCase()}` ||
        (pathName === '/' && `/${buttonText.toLowerCase()}` === '/dashboard')

    const icons: Map<string, any> = new Map([
        ['MdSpaceDashboard', <MdSpaceDashboard className={styledIcon} />],
        ['IoWallet', <IoWallet className={styledIcon} />],
        ['BiTransfer', <BiTransfer className={styledIcon} />],
        ['FaCalculator', <FaCalculator className={styledIcon} />],
        ['IoMdAnalytics', <IoMdAnalytics className={styledIcon} />],
        ['MdSettings', <MdSettings className={styledIcon} />],
        ['IoLogOut', <IoLogOut className={styledIcon} />],
    ])

    return (
        <Link
            className={styledSideBarLink(
                isCurrentButtonActive,
                shouldBeAtTheBottom
            )}
            to={linkTo}
            onClick={onClickHandler}
        >
            {icons.get(icon)}
            {buttonText}
        </Link>
    )
}
