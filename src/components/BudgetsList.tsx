import { css } from '@emotion/css'
import { TbMathGreater } from 'react-icons/tb'
import Budget from './Budget'
import { useNavigate } from 'react-router-dom'

const styledBudgetsListWrapper = css`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 2px;
    margin: 1em;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
`

const styledHeader = css`
    padding: 1em;
    font-weight: 600;
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const styledRecentRecordText = css`
    padding: 0.5em;
    font-size: 24px;
`

const styledSeeAllRecords = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5em;
    border-radius: 2px;
    text-align: center;
    font-size: 18px;

    &:hover {
        background-color: #f0f0f080;
    }
`

const styledBudgets = css`
    padding: 0 1em 0 1em;
`

export default function BudgetsList() {
    const navigate = useNavigate()

    // TODO add fetching account from the backend
    const budgets: {
        id: number
        name: string
        leftAmount: number
        leftPercentages: number
    }[] = [
        { id: 1, name: 'Food', leftAmount: 1000, leftPercentages: 50 },
        { id: 2, name: 'House', leftAmount: 2400, leftPercentages: 0 },
        { id: 3, name: 'Car', leftAmount: -200, leftPercentages: -100 },
    ]

    return (
        <div className={styledBudgetsListWrapper}>
            <div className={styledHeader}>
                <p className={styledRecentRecordText}>Budgets</p>

                <div
                    className={styledSeeAllRecords}
                    onClick={() => navigate('/budgets')}
                >
                    <p>See All</p>
                    <TbMathGreater size="15px" />
                </div>
            </div>
            <div className={styledBudgets}>
                {budgets.map((budget) => {
                    return (
                        <Budget
                            key={budget.id}
                            name={budget.name}
                            leftAmount={budget.leftAmount}
                            leftPercentages={budget.leftPercentages}
                        />
                    )
                })}
            </div>
        </div>
    )
}
