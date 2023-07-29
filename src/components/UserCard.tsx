import { HiDotsVertical } from 'react-icons/hi'
import OutsideClickHandler from 'react-outside-click-handler'
import MenuButton from './MenuButton'
import { useState } from 'react'
import { css } from '@emotion/css'

const styledUserCardWrapper = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #f0f0f0;

    font-weight: 500;
    margin-bottom: 1em;
    cursor: pointer;
    border-radius: 2px;

    background-color: #ffffff;
    padding: 1em;

    &:hover {
        background-color: #f0f0f0;
        border-bottom: 2px solid #62656980;
    }

    width: 100%;
`

const styledMainUserInfo = css`
    display: flex;
    justify-content: space-between;
    width: 50%;
`

const styledUserInfo = css`
    width: 50%;
    text-align: left;
`

const styledUserStatus = (isActive: boolean) => css`
    color: ${isActive ? '#1d934b' : '#f12e25'};
    font-weight: 600;
    background-color: ${isActive ? '#1d934b40' : '#f12e2540'};
    padding: 0.2em;
    border-radius: 2px;
    width: 70px;
    text-align: center;
`

const styledMenuSection = css`
    position: relative;
`

const styledIcon = css`
    font-size: 22px;
    color: #626569;

    &:hover {
        color: black;
    }
`

const styledMenu = css`
    background-color: #ffffff;
    padding: 0.5em;
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 130%;
    margin-right: -10px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 999;
    width: 160px;
`

export default function UserCard({
    id,
    fullName,
    email,
    isActive,
    handleResendActivationMail,
    handleForgotPassword,
}: {
    id: number
    fullName: string
    email: string
    isActive: boolean
    handleResendActivationMail: (userId: number) => void
    handleForgotPassword: (userId: number) => void
}) {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className={styledUserCardWrapper}>
            <div className={styledMainUserInfo}>
                <p className={styledUserInfo}>{fullName}</p>
                <p className={styledUserInfo}>{email}</p>
            </div>
            <p className={styledUserStatus(isActive)}>
                {isActive ? 'Active' : 'InActive'}
            </p>

            <div className={styledMenuSection}>
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setShowMenu(false)
                    }}
                >
                    <HiDotsVertical
                        className={styledIcon}
                        onClick={(e) => setShowMenu(true)}
                    />
                    {showMenu && (
                        <div className={styledMenu}>
                            <MenuButton
                                buttonText="Send Activate Mail"
                                onClickHandler={() =>
                                    handleResendActivationMail(id)
                                }
                            />
                            <MenuButton
                                buttonText="Reset Password"
                                onClickHandler={() => handleForgotPassword(id)}
                            />
                        </div>
                    )}
                </OutsideClickHandler>
            </div>
        </div>
    )
}
