import { css } from '@emotion/css'
import moment from 'moment'

const styledRecordWrapper = css`
    display: flex;
    align-items: center;
    padding: 0.5em;
    font-weight: 500;
    margin-bottom: 0.7em;
    cursor: pointer;
    border-radius: 2px;
    border-bottom: 2px solid #f0f0f0;

    &:hover {
        background-color: #f0f0f0;

        border-bottom: 2px solid #62656980;
    }
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
    width: 25%;
`

const styledAccountName = css`
    color: #626569;
    width: 20%;
`

const styledRecordAmount = (isExpense: boolean, isTransfer: boolean) => css`
    font-weight: 600;
    color: ${isTransfer ? 'black' : isExpense ? '#f12e25' : '#1d934b'};
    text-align: right;
    width: 10%;
`

export default function Record({
    category,
    date,
    accountName,
    amount,
    isExpense = false,
    isTransfer = false,
    description = '',
}: {
    category: string
    date: string
    accountName: string
    amount: number
    isExpense: boolean
    isTransfer: boolean
    description?: string
}) {
    // TODO add displaying currency from the backend
    return (
        <div className={styledRecordWrapper}>
            <p className={styledCategoryName}>{category}</p>
            <p className={styledRecordDescription}>{description}</p>
            <p className={styledRecordDate}>
                {moment(date).format('Do MMM YY')}
            </p>
            <p className={styledAccountName}>{accountName}</p>
            <p className={styledRecordAmount(isExpense, isTransfer)}>
                {isExpense && '-'}&#36;{amount}
            </p>
        </div>
    )
}
