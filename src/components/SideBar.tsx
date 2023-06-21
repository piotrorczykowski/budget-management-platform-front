import AlignCenterWrapper from './AlignCenterWrapper'
import { css } from '@emotion/css'
import AppLogo from './AppLogo'
import SideBarButton from './SideBarButton'
import { useLogout } from '../hooks/useLogout'

const styledAppLogo = css`
    margin-bottom: 1em;
`

const styledLabel = css`
    align-self: flex-start;
    width: 250px;
    padding: 0 0 0 10px;
    font-weight: 600;
    font-size: 12px;
    color: #626569;
`

const styledBottomButtons = css`
    margin-top: auto;
`

export default function SideBar() {
    const { logout } = useLogout()

    return (
        <AlignCenterWrapper>
            <AppLogo className={styledAppLogo} />

            <p className={styledLabel}>OVERVIEW</p>

            <div>
                <SideBarButton
                    linkTo="/"
                    buttonText="Dashboard"
                    icon="MdSpaceDashboard"
                />

                <SideBarButton
                    linkTo="/accounts"
                    buttonText="Accounts"
                    icon="IoWallet"
                />

                <SideBarButton
                    linkTo="/records"
                    buttonText="Records"
                    icon="BiTransfer"
                />

                <SideBarButton
                    linkTo="/budgets"
                    buttonText="Budgets"
                    icon="FaCalculator"
                />

                <SideBarButton
                    linkTo="/analysis"
                    buttonText="Analysis"
                    icon="IoMdAnalytics"
                />
            </div>

            <div className={styledBottomButtons}>
                <SideBarButton
                    linkTo="/settings"
                    buttonText="Settings"
                    icon="MdSettings"
                />

                <SideBarButton
                    linkTo="/signIn"
                    buttonText="Log out"
                    icon="IoLogOut"
                    onClickHandler={logout}
                />
            </div>
        </AlignCenterWrapper>
    )
}
