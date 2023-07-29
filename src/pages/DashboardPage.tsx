import { css } from '@emotion/css'
import TopBar from '../components/TopBar'
import AccountsList from '../components/accountsList/AccountsList'
import BudgetsList from '../components/budgetsList/BudgetsList'
import { useLayoutEffect, useRef, useState } from 'react'
import RecordForm from '../components/recordForm/RecordForm'
import TopBarButton from '../components/TopBarButton'
import { Category, RecordType } from '../types/enums'
import { BasicApiObject } from '../types'
import { clearAllToasts, showErrorToast } from '../utils/toastUtils'
import { AxiosResponse } from 'axios'
import { sendGet } from '../api/axios'
import { ENDPOINTS } from '../api'
import RecordsList from '../components/recordsList/RecordsList'

const styledDashboardPageWrapper = css`
    height: 100%;
`

const styledDashboardPageContent = css`
    display: flex;
    flex-wrap: wrap;
    height: 90vh;
    overflow-y: scroll;
    overflow-x: hidden;
`

const styledRecords = css`
    align-self: flex-start;
    max-height: 70%;
`

const styledBudgets = css`
    width: 28%;
    max-height: 98%;
`

const styledLeftPanel = css`
    width: 70%;
    height: 85vh;
`

export default function DashboardPage() {
    const [showRecordForm, setShowRecordForm] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const categories: BasicApiObject[] = Object.values(Category).map(
        (category, index) => {
            return { id: index, name: category }
        }
    )

    const [recordType, setRecordType] = useState(RecordType.Expense)
    const [category, setCategory] = useState(categories[0])
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(new Date())
    const [description, setDescription] = useState('')

    const [account, setAccount] = useState({ id: -1, name: '-' })
    const [toAccount, setToAccount] = useState({ id: -1, name: '-' })

    const handleModalClose = async (shouldRefresh: boolean) => {
        setRecordType(RecordType.Expense)
        setCategory(categories[0])
        setAmount('')
        setDescription('')
        setDate(new Date())
        if (shouldRefresh) {
            setRefresh(!refresh)
        }
        setShowRecordForm(false)
    }

    const dataFetchedRef = useRef(false)

    const fetchUserProfile = async () => {
        clearAllToasts()

        try {
            const res: AxiosResponse = await sendGet(ENDPOINTS.fetchProfile)
            return res.data
        } catch (e: any) {
            showErrorToast(e?.response?.data?.Error)
        }
    }

    useLayoutEffect(() => {
        if (dataFetchedRef.current) return
        dataFetchedRef.current = true

        fetchUserProfile().then((data: any) => {
            localStorage.setItem('currency', data?.currency)
            localStorage.setItem('role', data?.role)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    <div>
                        <AccountsList refresh={refresh} />
                    </div>
                    <div className={styledRecords}>
                        <RecordsList refresh={refresh} />
                    </div>
                </div>
                <div className={styledBudgets}>
                    <BudgetsList refresh={refresh} />
                </div>
            </div>
            {showRecordForm && (
                <RecordForm
                    id={-1}
                    recordType={recordType}
                    category={category}
                    amount={amount}
                    date={date}
                    description={description}
                    account={account}
                    toAccount={toAccount}
                    handleSetRecordType={setRecordType}
                    handleSetCategory={setCategory}
                    handleSetAmount={setAmount}
                    handleSetDate={setDate}
                    handleSetDescription={setDescription}
                    handleSetAccount={setAccount}
                    handleSetToAccount={setToAccount}
                    handleModalClose={handleModalClose}
                    showModal={showRecordForm}
                />
            )}
        </div>
    )
}
