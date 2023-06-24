import { css } from '@emotion/css'
import TopBar from '../components/TopBar'

const styledAccountsPageWrapper = css``

export default function AccountsPage() {
    return (
        <div className={styledAccountsPageWrapper}>
            <TopBar pageNameText={'Accounts'} />
        </div>
    )
}
