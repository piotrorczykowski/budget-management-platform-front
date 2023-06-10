import { Link } from 'react-router-dom'
import AlignCenterWrapper from './AlignCenterWrapper'
import { css } from '@emotion/css'
import AppLogo from './AppLogo'
import { MdSpaceDashboard, MdSettings } from 'react-icons/md'
import { IoLogOut, IoWallet } from 'react-icons/io5'
import { BiTransfer } from 'react-icons/bi'
import { FaCalculator } from 'react-icons/fa'
import { IoMdAnalytics } from 'react-icons/io'

const styledAppLogo = css`
    margin-bottom: 1em;
`

const styledLabel = css`
    align-self: flex-start;
    width: 250px;

    padding: 0 0 0 10px;
    font-weight: 600;
    color: #626569;
`

const styledSideBarLink = (shouldBeAtTheBottom: boolean = false) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: flex-start;
    font-size: 20px;
    font-weight: 600;
    width: 250px;
    padding: 10px;
    margin-bottom: 10px;
    ${shouldBeAtTheBottom ? 'margin-top: auto;' : ''}

    color: #bebfbf;

    &:hover {
        color: #ffffff;
        background-color: #f0f0f040;
    }
`

const styledIcon = css`
    font-size: 24px;
    margin-right: 1em;
`

export default function SideBar() {
    return (
        <AlignCenterWrapper>
            <AppLogo className={styledAppLogo} />

            <p className={styledLabel}>OVERVIEW</p>

            <Link className={styledSideBarLink()} to="/">
                <MdSpaceDashboard className={styledIcon} />
                Dashboard
            </Link>

            <Link className={styledSideBarLink()} to="/">
                <IoWallet className={styledIcon} />
                Accounts
            </Link>

            <Link className={styledSideBarLink()} to="/">
                <BiTransfer className={styledIcon} />
                Records
            </Link>

            <Link className={styledSideBarLink()} to="/">
                <FaCalculator className={styledIcon} />
                Budgets
            </Link>

            <Link className={styledSideBarLink()} to="/">
                <IoMdAnalytics className={styledIcon} />
                Analysis
            </Link>

            <Link className={styledSideBarLink(true)} to="/">
                <MdSettings className={styledIcon} />
                Settings
            </Link>

            <Link className={styledSideBarLink()} to="/">
                <IoLogOut className={styledIcon} />
                Log out
            </Link>
        </AlignCenterWrapper>
    )
}
