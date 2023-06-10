import { css } from '@emotion/css'
import TopBar from '../components/TopBar'

const styledDashboardPageWrapper = css`
    height: 100%;
    background-color: #f0f0f0;
`

const styledDashboardPageContent = css`
    display: grid;
    grid-template-columns: repeat(3, 200px);
    grid-template-rows: repeat(3, 200px);
    padding: 2em;
`

const one = css`
    border: solid 1px black;
`

export default function DashboardPage() {
    return (
        <div className={styledDashboardPageWrapper}>
            <TopBar pageNameText={'Dashboard'} />

            <div className={styledDashboardPageContent}>
                <div className={one}>One</div>
                <div className={one}>Two</div>
                <div className={one}>Three</div>
                <div className={one}>Four</div>
                <div className={one}>Five</div>
                <div className={one}>Six</div>
            </div>
        </div>
    )
}
