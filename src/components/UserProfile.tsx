import { css } from '@emotion/css'
import { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import { useLogout } from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import MenuButton from './MenuButton'

const styledUserProfile = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-right: 1em;
    z-index: 1000;
`

const styledIcon = css`
    font-size: 32px;
`

const styledSettings = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    right: 0;
    margin-right: 10px;
    margin-top: 10px;
    padding: 0.5em;
    width: 150px;
    height: 100px;
    background-color: #ffffff;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
`

export default function UserProfile() {
    const [showMenu, setShowMenu] = useState(false)
    const { logout } = useLogout()
    const navigate = useNavigate()

    return (
        <div
            className={styledUserProfile}
            onClick={() => setShowMenu(!showMenu)}
        >
            <CgProfile className={styledIcon} />
            {showMenu ? (
                <div>
                    <MdOutlineKeyboardArrowUp className={styledIcon} />
                    <div className={styledSettings}>
                        <MenuButton
                            buttonText="Settings"
                            onClickHandler={() => navigate('/settings')}
                        />
                        <MenuButton
                            buttonText="Logout"
                            onClickHandler={logout}
                        />
                    </div>
                </div>
            ) : (
                <MdOutlineKeyboardArrowDown className={styledIcon} />
            )}
        </div>
    )
}
