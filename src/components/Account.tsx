import { css } from '@emotion/css'
import { IoWallet } from 'react-icons/io5'

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
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    color: black;
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
    // TODO add displaying currency from data
    const isNegative: boolean = accountBalance < 0
    return (
        <div className={styledAccount} onClick={() => onClickHandler(id)}>
            {isEmpty ? (
                <div className={styledEmptyAccount}>+ Add Account</div>
            ) : (
                <div className={styledAccountInfo}>
                    <IoWallet className={styledIcon} />
                    <p className={styledAccountName}>{accountName}</p>
                    <p className={styledAccountBalance}>
                        {isNegative ? '-' : ''}&#36;
                        {Number(Math.abs(accountBalance)).toFixed(2)}
                    </p>
                </div>
            )}
        </div>
    )
}
