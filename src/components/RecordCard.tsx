import { css } from '@emotion/css'
import moment from 'moment'

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
    color: ${isTransfer ? '#626569' : isExpense ? '#f12e25' : '#1d934b'};
    text-align: right;
    width: 10%;
`

export default function RecordCard({
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
