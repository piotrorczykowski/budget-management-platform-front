import { css } from '@emotion/css'
import TopBar from '../components/TopBar'
import CustomMontAndYearPicker from '../components/CustomMonthAndYearPicker'
import { useState } from 'react'
import CashFlowCard from '../components/CashFlowCard'
import moment from 'moment'

const styledStatisticsPageWrapper = css`
    width: 100%;
    height: 100%;
`

const styledAnalyticsPageContent = css`
    display: flex;
`

const styledLeftPanel = css`
    width: 70%;
    height: 100vh;
`

const styledRightPanel = css`
    width: 30%;
    height: 100vh;
`

export default function AnalyticsPage() {
    const [date, setDate] = useState(new Date())

    const [income, setIncome] = useState(0)
    const [expenses, setExpenses] = useState(0)

    const formattedMonth: string = moment(date).format('MMMM')

    return (
        <div className={styledStatisticsPageWrapper}>
            <TopBar pageNameText={'Analytics'}>
                <CustomMontAndYearPicker
                    date={date}
                    handleDateChange={setDate}
                />
            </TopBar>

            <div className={styledAnalyticsPageContent}>
                <div className={styledLeftPanel}>
                    <CashFlowCard
                        month={formattedMonth}
                        income={income}
                        expenses={expenses}
                    />
                </div>
                <div className={styledRightPanel}></div>
            </div>
        </div>
    )
}
