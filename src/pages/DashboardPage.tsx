import { css } from '@emotion/css'
import TopBar from '../components/TopBar'
import AccountsList from '../components/AccountsList'

const styledDashboardPageWrapper = css`
    height: 100%;
    background-color: #f0f0f0;
`

const styledDashboardPageContent = css`
    display: flex;
    flex-wrap: wrap;
    height: 90vh;
    background-color: #f0f0f0;
`

const styledAccounts = css`
    height: 230px;
`

const styledRecords = css`
    border: solid 1px black;
    padding: 1em;
    align-self: flex-start;
    height: 66.4vh;
`

const styledBudgets = css`
    border: solid 1px black;
    padding: 1em;
    width: 28%;
    height: 89vh;
`

const styledLeftPanel = css`
    width: 70%;
`

export default function DashboardPage() {
    return (
        <div className={styledDashboardPageWrapper}>
            <TopBar pageNameText={'Dashboard'} />

            <div className={styledDashboardPageContent}>
                <div className={styledLeftPanel}>
                    <div className={styledAccounts}>
                        <AccountsList />
                    </div>
                    <div className={styledRecords}>Records</div>
                </div>
                <div className={styledBudgets}>Budgets</div>
            </div>
        </div>
    )
}
