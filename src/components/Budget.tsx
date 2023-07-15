import { css } from '@emotion/css'
import BudgetProgressBar from './BudgetProgressBar'

const styledBudgetWrapper = css`
    width: 95%;
    padding: 0.5em;
    font-weight: 500;
    margin: auto;
    margin-bottom: 0.5em;
    cursor: pointer;
    border-radius: 2px;

    &:hover {
        background-color: #f0f0f0;
    }
`

const styledBudgetInfo = css`
    display: flex;
    align-items: center;
    position: relative;
`

const styledBudgetName = css`
    font-weight: 600;
    font-size: 18px;
`

const styledBudgetLeftAmount = css`
    width: 80px;
    position: absolute;
    left: 310px;
`

const styledBudgetLeftAmountPercentage = css`
    color: #62656980;
    font-size: 14px;
    position: absolute;
    left: 375px;
    width: 40px;
    text-align: right;
`

const styledBudgetProgressBar = css`
    height: 20px;
`

export default function Budget({
    name,
    leftAmount,
    leftPercentages,
}: {
    name: string
    leftAmount: number
    leftPercentages: number
}) {
    // TODO add displaying currency from the backend
    const formattedLeftAmount: string =
        leftAmount < 0 ? `-$${-1 * leftAmount}` : `$${leftAmount}`

    return (
        <div className={styledBudgetWrapper}>
            <div className={styledBudgetInfo}>
                <p className={styledBudgetName}>{name}</p>
                <p className={styledBudgetLeftAmount}>{formattedLeftAmount}</p>
                <p className={styledBudgetLeftAmountPercentage}>
                    {leftPercentages}%
                </p>
            </div>
            <div className={styledBudgetProgressBar}>
                <BudgetProgressBar completed={leftPercentages} />
            </div>
        </div>
    )
}
