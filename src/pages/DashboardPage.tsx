import { css } from '@emotion/css'
import TopBar from '../components/TopBar'
import AccountsList from '../components/AccountsList'
import RecordsList from '../components/RecordsList'
import BudgetsList from '../components/BudgetsList'
import { useState } from 'react'
import RecordForm from '../components/RecordForm/RecordForm'
import TopBarButton from '../components/TopBarButton'

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
    align-self: flex-start;
    height: 66.7vh;
`

const styledBudgets = css`
    width: 28%;
    height: 89vh;
`

const styledLeftPanel = css`
    width: 70%;
`

export default function DashboardPage() {
    const [showRecordForm, setShowRecordForm] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const handleModalClose = async (addedRecord: boolean) => {
        setShowRecordForm(false)
        if (addedRecord) {
            setRefresh(!refresh)
        }
    }

    return (
        <div className={styledDashboardPageWrapper}>
            <TopBar pageNameText={'Dashboard'}>
                <TopBarButton
                    buttonText="Add Record"
                    onClickHandler={() => setShowRecordForm(true)}
                />
            </TopBar>

            <div className={styledDashboardPageContent}>
                <div className={styledLeftPanel}>
                    <div className={styledAccounts}>
                        <AccountsList />
                    </div>
                    <div className={styledRecords}>
                        <RecordsList refresh={refresh} />
                    </div>
                </div>
                <div className={styledBudgets}>
                    <BudgetsList />
                </div>
            </div>
            {showRecordForm && (
                <RecordForm
                    showModal={showRecordForm}
                    handleModalClose={handleModalClose}
                />
            )}
        </div>
    )
}
