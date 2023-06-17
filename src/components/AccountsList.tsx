import { css } from '@emotion/css'
import Account from './Account'

const styledAccountsListWrapper = css`
    display: flex;
`

export default function AccountsList() {
    // TODO add fetching account from backend
    const accounts: { accountName: string; accountBalance: number }[] = [
        { accountName: 'mBank', accountBalance: 1234.53 },
        { accountName: 'Millenium', accountBalance: 2000 },
        { accountName: 'Savings', accountBalance: 12534.03 },
    ]

    const hasUserMaxAccount: boolean = accounts.length > 4

    return (
        <div className={styledAccountsListWrapper}>
            {accounts.map((account) => {
                return (
                    <Account
                        accountName={account.accountName}
                        accountBalance={account.accountBalance}
                    />
                )
            })}
            {!hasUserMaxAccount && (
                <Account accountName="" accountBalance={0} isEmpty={true} />
            )}
        </div>
    )
}
