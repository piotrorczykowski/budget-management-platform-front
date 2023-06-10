import { css } from '@emotion/css'
import TopBar from '../components/TopBar'

const styledDashboardPageWrapper = css`
    height: 100%;
    background-color: #f0f0f0;
`

const styledDashboardPageContent = css`
    height: 85%;
    display: grid;
    grid-template-columns: repeat(5, 19%);
    grid-template-rows: repeat(7, 13%);
    grid-gap: 1em;
    padding: 2em;
`

const one = css`
    border: solid 1px black;
    padding: 0.5em;
`

export default function DashboardPage() {
    const rows = []
    for (let i = 0; i < 5 * 7; i++) {
        rows.push(<div className={one}>{i}</div>)
    }

    return (
        <div className={styledDashboardPageWrapper}>
            <TopBar pageNameText={'Dashboard'} />

            <div className={styledDashboardPageContent}>{rows}</div>
        </div>
    )
}
