import { css } from '@emotion/css'
import moment from 'moment'
import { HiDotsVertical } from 'react-icons/hi'
import OutsideClickHandler from 'react-outside-click-handler'
import MenuButton from './MenuButton'
import { useState } from 'react'
import { DefaultAccountName } from '../types/constants'

const styledRecordWrapper = css`
    display: flex;
    align-items: center;
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

const styledMainRecordSection = css`
    display: flex;
    align-items: center;
    width: 100%;
`

const styledCategoryName = css`
    font-weight: 600;
    font-size: 18px;
    width: 20%;
`

const styledRecordDescription = css`
    color: #62656980;
    width: 25%;
`

const styledRecordDate = css`
    color: #626569;
    width: 20%;
`

const styledAccountName = css`
    color: #626569;
    width: 20%;
`

const styledRecordAmount = (isExpense: boolean, isTransfer: boolean) => css`
    font-weight: 600;
    color: ${isTransfer ? '#626569' : isExpense ? '#f12e25' : '#1d934b'};
    text-align: right;
    width: 10%;
`

const styledMenuSection = css`
    width: 5%;
    text-align: right;
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
    margin-top: 30%;
    margin-right: -10px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 999;
`

export default function RecordCard({
    id,
    category,
    date,
    accountName,
    amount,
    isExpense = false,
    isTransfer = false,
    description = '',
    handleRecordEdit,
    handleRecordDelete,
}: {
    id: number
    category: string
    date: string
    accountName: string
    amount: number
    isExpense: boolean
    isTransfer: boolean
    description?: string
    handleRecordEdit: (recordId: number) => void
    handleRecordDelete: (recordId: number) => void
}) {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className={styledRecordWrapper}>
            <div
                className={styledMainRecordSection}
                onClick={() => handleRecordEdit(id)}
            >
                <p className={styledCategoryName}>{category}</p>
                <p className={styledRecordDescription}>{description}</p>
                <p className={styledRecordDate}>
                    {moment(date).format('Do MMM YY')}
                </p>
                <p className={styledAccountName}>
                    {accountName || DefaultAccountName}
                </p>
                <p className={styledRecordAmount(isExpense, isTransfer)}>
                    {isExpense && '-'}&#36;{amount}
                </p>
            </div>

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
                                buttonText="Edit"
                                onClickHandler={() => handleRecordEdit(id)}
                            />
                            <MenuButton
                                buttonText="Delete"
                                onClickHandler={() => handleRecordDelete(id)}
                            />
                        </div>
                    )}
                </OutsideClickHandler>
            </div>
        </div>
    )
}
