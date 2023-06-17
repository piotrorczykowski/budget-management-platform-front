import { css } from '@emotion/css'
import TopBar from '../components/TopBar'
import Account from '../components/Account'

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
    display: flex;
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
    // TODO add fetching account from backend
    const accounts: { accountName: string; accountBalance: number }[] = [
        { accountName: 'mBank', accountBalance: 1234.53 },
        { accountName: 'Millenium', accountBalance: 2000 },
        { accountName: 'Savings', accountBalance: 12534.03 },
    ]

    return (
        <div className={styledDashboardPageWrapper}>
            <TopBar pageNameText={'Dashboard'} />

            <div className={styledDashboardPageContent}>
                <div className={styledLeftPanel}>
                    <div className={styledAccounts}>
                        {accounts.length === 0 ? (
                            <Account
                                accountName=""
                                accountBalance={0}
                                isEmpty={true}
                            />
                        ) : (
                            accounts.map((account) => {
                                return (
                                    <Account
                                        accountName={account.accountName}
                                        accountBalance={account.accountBalance}
                                    />
                                )
                            })
                        )}
                    </div>
                    <div className={styledRecords}>Records</div>
                </div>
                <div className={styledBudgets}>Budgets</div>
            </div>
        </div>
    )
}
