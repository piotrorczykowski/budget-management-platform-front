import { css } from '@emotion/css'
import ProgressBar from './ProgressBar'
import { Currency, ProgressBarColor } from '../types/enums'
import { getCurrencySymbol } from '../utils/otherUtils'

const styledBudgetWrapper = css`
    width: 95%;
    padding: 0.5em;
    font-weight: 500;
    margin: auto;
    margin-bottom: 0.7em;
    cursor: pointer;
    border-radius: 2px;

    &:hover {
        background-color: #f0f0f0;
    }
`

const styledBudgetInfo = css`
    display: flex;
    align-items: center;
`

const styledBudgetName = css`
    font-weight: 600;
    font-size: 18px;
    width: 55%;
`

const styledLeftRemains = css`
    width: 45%;
    text-align: right;
    margin-left: auto;
`

const styledLeftRemainsPercentage = css`
    color: #62656980;
    font-size: 14px;
    text-align: right;
    width: 12%;
`

const styledBudgetProgressBar = css`
    height: 20px;
`

export default function Budget({
    id,
    name,
    planned,
    spent,
    handleBudgetEdit,
}: {
    id: number
    name: string
    planned: number
    spent: number
    handleBudgetEdit: (budgetId: number) => void
}) {
    const remains: number = planned - spent
    const budgetProgress: number = 100 - (remains / planned) * 100

    const currency: Currency = localStorage.getItem('currency') as Currency

    const formattedRemains: string =
        remains < 0
            ? `-${getCurrencySymbol(currency)}${(-1 * remains).toFixed(2)}`
            : `${getCurrencySymbol(currency)}${remains.toFixed(2)}`

    const formattedLeftPercentages: string =
        budgetProgress > 100
            ? `-${(budgetProgress - 100).toFixed(0)}%`
            : `${budgetProgress.toFixed(0)}%`

    return (
        <div
            className={styledBudgetWrapper}
            onClick={() => handleBudgetEdit(id)}
        >
            <div className={styledBudgetInfo}>
                <p className={styledBudgetName}>{name}</p>
                <p className={styledLeftRemains}>{formattedRemains}</p>
                <p className={styledLeftRemainsPercentage}>
                    {formattedLeftPercentages}
                </p>
            </div>
            <div className={styledBudgetProgressBar}>
                <ProgressBar
                    progress={budgetProgress}
                    progressBarColor={
                        remains > 0
                            ? ProgressBarColor.Green
                            : ProgressBarColor.Red
                    }
                />
            </div>
        </div>
    )
}
