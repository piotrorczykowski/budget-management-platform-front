import { css } from '@emotion/css'
import { IoWallet } from 'react-icons/io5'
import { getCurrencySymbol } from '../utils/otherUtils'
import { Currency } from '../types/enums'

const styledAccount = css`
    width: 200px;
    height: 200px;
    background-color: white;

    color: white;
    margin: 1em;

    border-radius: 2px;
    cursor: pointer;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: #f0f0f020;
    }
`

const styledAccountInfo = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    color: black;
    padding: 0 0 0 1em;
`

const styledIcon = css`
    font-size: 60px;
    margin-bottom: 0.5em;
`

const styledAccountName = css`
    font-size: 20px;
    margin: 0.1em;
    font-weight: 500;
`

const styledAccountBalance = css`
    font-size: 24px;
    font-weight: 600;
`

const styledEmptyAccount = css`
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    border: dashed 2px #bebfbf;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #bebfbf;

    &:hover {
        color: black;
        border: dashed 2px black;
    }
`

export default function Account({
    id,
    accountName,
    accountBalance,
    isEmpty = false,
    onClickHandler,
}: {
    id: number
    accountName: string
    accountBalance: number
    isEmpty?: boolean
    onClickHandler: (accountId: number) => void
}) {
    const currency: Currency = localStorage.getItem('currency') as Currency
    const isNegative: boolean = accountBalance < 0
    return (
        <div className={styledAccount}>
            {isEmpty ? (
                <div
                    className={styledEmptyAccount}
                    onClick={() => onClickHandler(id)}
                >
                    + Add Account
                </div>
            ) : (
                <div
                    className={styledAccountInfo}
                    onClick={() => onClickHandler(id)}
                >
                    <IoWallet className={styledIcon} />
                    <p className={styledAccountName}>{accountName}</p>
                    <p className={styledAccountBalance}>
                        {isNegative ? '-' : ''}
                        {getCurrencySymbol(currency)}
                        {Number(Math.abs(accountBalance)).toFixed(2)}
                    </p>
                </div>
            )}
        </div>
    )
}
