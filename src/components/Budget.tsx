import { css } from '@emotion/css'
import BudgetProgressBar from './BudgetProgressBar'

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
    width: 80%;
`

const styledLeftRemains = css`
    width: 20%;
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
}: {
    id: number
    name: string
    planned: number
    spent: number
}) {
    const remains: number = planned - spent
    const leftPercentages: number = (remains / planned) * 100

    // TODO add displaying currency from the backend
    const formattedRemains: string =
        remains < 0 ? `-$${-1 * remains}` : `$${remains}`
    const formattedLeftPercentages: string =
        leftPercentages > 100
            ? `-${(leftPercentages - 100).toFixed(0)}%`
            : `${leftPercentages.toFixed(0)}%`

    return (
        <div className={styledBudgetWrapper}>
            <div className={styledBudgetInfo}>
                <p className={styledBudgetName}>{name}</p>
                <p className={styledLeftRemains}>{formattedRemains}</p>
                <p className={styledLeftRemainsPercentage}>
                    {formattedLeftPercentages}
                </p>
            </div>
            <div className={styledBudgetProgressBar}>
                <BudgetProgressBar completed={leftPercentages} />
            </div>
        </div>
    )
}
