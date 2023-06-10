import { css } from '@emotion/css'
import { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
} from 'react-icons/md'

const styledUserProfile = css`
    display: flex;
    flex-direction: row;
    margin-left: auto;
    cursor: pointer;
    margin-right: 1em;
`

const styledIcon = css`
    font-size: 32px;
`

export default function UserProfile() {
    const [showMenu, setShowMenu] = useState(false)

    // TODO add user settings
    return (
        <div
            className={styledUserProfile}
            onClick={() => setShowMenu(!showMenu)}
        >
            <CgProfile className={styledIcon} />
            {showMenu ? (
                <MdOutlineKeyboardArrowUp className={styledIcon} />
            ) : (
                <MdOutlineKeyboardArrowDown className={styledIcon} />
            )}
        </div>
    )
}
