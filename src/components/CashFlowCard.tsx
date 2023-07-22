import { css } from '@emotion/css'
import ProgressBar from './ProgressBar'
import { Currency, ProgressBarColor } from '../types/enums'
import { getCurrencySymbol } from '../utils/otherUtils'

const styledCashflowCardWrapper = css`
    background-color: #ffffff;
    margin: 1em;
    padding: 1em;
    border-radius: 2px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
`

const styledHeader = css`
    font-weight: 600;
    padding-bottom: 1em;
    margin-bottom: 1em;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2);
    font-size: 18px;
`

const styledMonth = css`
    font-weight: 600;
    color: #777b86;
`

const styledCashFlow = css`
    font-weight: 600;
    font-size: 26px;
    margin-bottom: 0.5em;
`

const styledIncomeSection = css`
    margin-bottom: 1em;
`

const styledIncomeBar = css`
    width: 100%;
    height: 30px;
    padding: 0.5em 0 0.5em 0;
`

const styledProgressBarInfo = css`
    display: flex;
    justify-content: space-between;
    padding: 0 0.2em 0 0.2em;
`

const styledLabel = css`
    display: block;
    font-weight: 500;
`

const styledExpenses = css`
    width: 100%;
    height: 30px;
    padding: 0.5em 0 0.5em 0;
`

export default function CashFlowCard({
    month,
    income,
    expenses,
}: {
    month: string
    income: number
    expenses: number
}) {
    const currency: Currency = localStorage.getItem('currency') as Currency
    const cashFlow: number = income - expenses

    return (
        <div className={styledCashflowCardWrapper}>
            <p className={styledHeader}>Cash Flow</p>

            <p className={styledMonth}>{month}</p>
            <p className={styledCashFlow}>
                {cashFlow < 0 ? '-' : ''} {getCurrencySymbol(currency)}{' '}
                {Math.abs(cashFlow).toFixed(2)}
            </p>

            <div className={styledIncomeSection}>
                <div className={styledProgressBarInfo}>
                    <p className={styledLabel}>Income</p>
                    <p className={styledLabel}>
                        {getCurrencySymbol(currency)}{' '}
                        {Math.abs(cashFlow).toFixed(2)}
                    </p>
                </div>
                <div className={styledIncomeBar}>
                    <ProgressBar
                        progress={100}
                        progressBarColor={ProgressBarColor.Green}
                    />
                </div>
            </div>

            <div>
                <div className={styledProgressBarInfo}>
                    <p className={styledLabel}>Expenses</p>
                    <p className={styledLabel}>
                        -{getCurrencySymbol(currency)}{' '}
                        {Math.abs(cashFlow).toFixed(2)}
                    </p>
                </div>
                <div className={styledExpenses}>
                    <ProgressBar
                        progress={50}
                        progressBarColor={ProgressBarColor.Red}
                    />
                </div>
            </div>
        </div>
    )
}
