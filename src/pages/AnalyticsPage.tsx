import { css } from '@emotion/css'
import TopBar from '../components/TopBar'
import CustomMontAndYearPicker from '../components/CustomMonthAndYearPicker'
import { useState } from 'react'

const styledStatisticsPageWrapper = css``

export default function AnalyticsPage() {
    const [date, setDate] = useState(new Date())

    return (
        <div className={styledStatisticsPageWrapper}>
            <TopBar pageNameText={'Analytics'}>
                <CustomMontAndYearPicker
                    date={date}
                    handleDateChange={setDate}
                />
            </TopBar>
        </div>
    )
}
