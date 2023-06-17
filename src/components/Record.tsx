import { css } from '@emotion/css'
import moment from 'moment'

const styledRecordWrapper = css`
    width: 95%;
    border-bottom: 2px solid #f0f0f0;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    padding: 0.5em;
    font-weight: 500;
    margin: auto;
    position: relative;
`

const styledCategoryName = css`
    font-weight: 600;
    font-size: 18px;
`

const styledRecordDescription = css`
    color: #62656980;
    position: absolute;
    left: 200px;
`

const styledRecordDate = css`
    color: #626569;
    margin-left: 150px;
    position: absolute;
    left: 400px;
`

const styledAccountName = css`
    color: #626569;
    position: absolute;
    left: 800px;
`

const styledRecordAmount = (isExpense: boolean) => css`
    font-weight: 600;
    color: ${isExpense ? '#f12e25' : '#1d934b'};
    position: absolute;
    left: 980px;
    width: 100px;
    text-align: right;
`

export default function Record({
    category,
    date,
    accountName,
    amount,
    isExpense = false,
    description = '',
}: {
    category: string
    date: string
    accountName: string
    amount: number
    isExpense?: boolean
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
            <p className={styledRecordAmount(isExpense)}>
                {isExpense && '-'}&#36;{amount}
            </p>
        </div>
    )
}
