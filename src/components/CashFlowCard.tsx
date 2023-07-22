import { css } from '@emotion/css'
import ProgressBar from './ProgressBar'
import { Currency, ProgressBarColor } from '../types/enums'
import { getCurrencySymbol } from '../utils/otherUtils'
import { useLayoutEffect, useState } from 'react'
import moment from 'moment'
import { clearAllToasts, showErrorToast } from '../utils/toastUtils'
import { AxiosResponse } from 'axios'
import { sendGet } from '../api/axios'
import { ENDPOINTS } from '../api'

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

const getIncomeProgressBarValue = (
    isCashFlowNegative: boolean,
    income: number,
    expenses: number
) => {
    if (!income) {
        return 0
    }

    if (isCashFlowNegative) {
        return (income / expenses) * 100
    } else {
        return 100
    }
}

const getExpensesProgressBarValue = (
    isCashFlowNegative: boolean,
    income: number,
    expenses: number
) => {
    if (!expenses) {
        return 0
    }

    if (isCashFlowNegative) {
        return (expenses / income) * 100
    } else {
        return 100
    }
}

export default function CashFlowCard({ date }: { date: Date }) {
    const [income, setIncome] = useState(0)
    const [expenses, setExpenses] = useState(0)

    const formattedMonth: string = moment(date).format('MMMM')

    const currency: Currency = localStorage.getItem('currency') as Currency
    const cashFlow: number = income - expenses
    const isCashFlowNegative: boolean = cashFlow < 0

    const incomeProgressBarValue: number = getIncomeProgressBarValue(
        isCashFlowNegative,
        income,
        expenses
    )

    const expensesProgressBarValue: number = getExpensesProgressBarValue(
        isCashFlowNegative,
        income,
        expenses
    )

    useLayoutEffect(() => {
        const fetchCashFlow = async (date: Date) => {
            clearAllToasts()
            try {
                const userId: number = localStorage.getItem(
                    'userId'
                ) as unknown as number
                const timestamp: number = moment(date).unix()

                const res: AxiosResponse = await sendGet(
                    ENDPOINTS.fetchCashFlow(userId, timestamp)
                )

                return res.data
            } catch (e: any) {
                showErrorToast(e?.response?.data?.Error)
            }
        }

        fetchCashFlow(date).then((data: any) => {
            setIncome(data?.income)
            setExpenses(data?.expenses)
        })
    }, [date])

    return (
        <div className={styledCashflowCardWrapper}>
            <p className={styledHeader}>Cash Flow</p>

            <p className={styledMonth}>{formattedMonth}</p>
            <p className={styledCashFlow}>
                {cashFlow < 0 ? '-' : ''}
                {getCurrencySymbol(currency)}
                {Math.abs(cashFlow)?.toFixed(2)}
            </p>

            <div className={styledIncomeSection}>
                <div className={styledProgressBarInfo}>
                    <p className={styledLabel}>Income</p>
                    <p className={styledLabel}>
                        {getCurrencySymbol(currency)}
                        {income?.toFixed(2)}
                    </p>
                </div>
                <div className={styledIncomeBar}>
                    <ProgressBar
                        progress={incomeProgressBarValue}
                        progressBarColor={ProgressBarColor.Green}
                    />
                </div>
            </div>

            <div>
                <div className={styledProgressBarInfo}>
                    <p className={styledLabel}>Expenses</p>
                    <p className={styledLabel}>
                        -{getCurrencySymbol(currency)}
                        {expenses?.toFixed(2)}
                    </p>
                </div>
                <div className={styledExpenses}>
                    <ProgressBar
                        progress={expensesProgressBarValue}
                        progressBarColor={ProgressBarColor.Red}
                    />
                </div>
            </div>
        </div>
    )
}
