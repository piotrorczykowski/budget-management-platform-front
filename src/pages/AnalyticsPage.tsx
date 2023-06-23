import { css } from '@emotion/css'
import TopBar from '../components/TopBar'

const styledStatisticsPageWrapper = css``

export default function AnalyticsPage() {
    return (
        <div className={styledStatisticsPageWrapper}>
            <TopBar pageNameText={'Analytics'} />
        </div>
    )
}
