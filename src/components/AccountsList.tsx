import { css } from '@emotion/css'
import Account from './Account'

const styledAccountsListWrapper = css`
    display: flex;
`

export default function AccountsList() {
    // TODO add fetching account from the backend
    const accounts: {
        id: number
        accountName: string
        accountBalance: number
    }[] = [
        { id: 1, accountName: 'mBank', accountBalance: 1234.53 },
        { id: 2, accountName: 'Millenium', accountBalance: 2000 },
        { id: 3, accountName: 'Savings', accountBalance: 12534.03 },
    ]

    const hasUserMaxAccount: boolean = accounts.length > 4

    return (
        <div className={styledAccountsListWrapper}>
            {accounts.map((account) => {
                return (
                    <Account
                        key={account.id}
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
