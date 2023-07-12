import { css } from '@emotion/css'
import { IoWallet } from 'react-icons/io5'
import { HiDotsVertical } from 'react-icons/hi'
import { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import MenuButton from './MenuButton'

const styledRecordWrapper = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #ffffff;

    font-weight: 500;
    margin-bottom: 1em;
    cursor: pointer;
    border-radius: 2px;

    background-color: #ffffff;
    padding: 1em;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: #f0f0f0;
        border-bottom: 2px solid #62656980;
    }
`

const styledAccountNameAndIcon = css`
    display: flex;
    align-items: center;
`

const styledAccountName = css`
    color: #626569;
    margin-left: 1em;
`

const styledAccountBalanceAndIcon = css`
    display: flex;
    align-items: center;
    position: relative;
`

const styledAccountBalance = css`
    font-weight: 600;
    text-align: right;
    margin-right: 1em;
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
    margin-top: 30%;
    margin-right: -10px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 999;
`

export default function AccountCard({
    id,
    name,
    balance,
    handleAccountEdit,
    handleAccountDelete,
}: {
    id: number
    name: string
    balance: number
    handleAccountEdit: (accountId: number) => void
    handleAccountDelete: (accountId: number) => void
}) {
    const [showMenu, setShowMenu] = useState(false)

    const isNegative: boolean = balance < 0
    return (
        <div className={styledRecordWrapper}>
            <div className={styledAccountNameAndIcon}>
                <IoWallet size={30} />
                <p className={styledAccountName}>{name}</p>
            </div>

            <div className={styledAccountBalanceAndIcon}>
                <p className={styledAccountBalance}>
                    {isNegative && '-'}&#36;
                    {Number(Math.abs(balance)).toFixed(2)}
                </p>
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
                                buttonText="Edit"
                                onClickHandler={() => handleAccountEdit(id)}
                            />
                            <MenuButton
                                buttonText="Delete"
                                onClickHandler={() => handleAccountDelete(id)}
                            />
                        </div>
                    )}
                </OutsideClickHandler>
            </div>
        </div>
    )
}
