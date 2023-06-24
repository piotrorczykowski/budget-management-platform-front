import { css } from '@emotion/css'
import TopBar from '../components/TopBar'

const styledBudgetsPageWrapper = css``

export default function BudgetsPage() {
    return (
        <div className={styledBudgetsPageWrapper}>
            <TopBar pageNameText={'Budgets'} />
        </div>
    )
}
