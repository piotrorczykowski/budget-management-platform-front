import { css } from '@emotion/css'
import TopBar from '../components/TopBar'
import AccountsList from '../components/AccountsList'
import RecordsList from '../components/RecordsList'
import BudgetsList from '../components/BudgetsList'
import { useLayoutEffect, useRef } from 'react'
import api from '../api/axios'
import { AxiosResponse } from 'axios'
import { ENDPOINTS } from '../api'
import { clearAllToasts, showErrorToast } from '../utils/toastUtils'

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
    const dataFetchedRef = useRef(false)

    const fetchUserProfile = async () => {
        clearAllToasts()

        try {
            const res: AxiosResponse = await api.get(ENDPOINTS.fetchProfile)
            return res.data
        } catch (e: any) {
            showErrorToast(e?.response?.data?.Error)
        }
    }

    useLayoutEffect(() => {
        if (dataFetchedRef.current) return
        dataFetchedRef.current = true

        fetchUserProfile().then((data: any) => {
            localStorage.setItem('userId', data?.id)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styledDashboardPageWrapper}>
            <TopBar pageNameText={'Dashboard'} />

            <div className={styledDashboardPageContent}>
                <div className={styledLeftPanel}>
                    <div className={styledAccounts}>
                        <AccountsList />
                    </div>
                    <div className={styledRecords}>
                        <RecordsList />
                    </div>
                </div>
                <div className={styledBudgets}>
                    <BudgetsList />
                </div>
            </div>
        </div>
    )
}
