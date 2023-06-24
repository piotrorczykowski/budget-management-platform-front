import { css } from '@emotion/css'
import Account from './Account'
import AccountForm from './AccountForm'
import { useLayoutEffect, useRef, useState } from 'react'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../utils/toastUtils'
import api from '../api/axios'
import { ENDPOINTS } from '../api'
import { AxiosResponse } from 'axios'

const styledAccountsListWrapper = css`
    display: flex;
`

export default function AccountsList() {
    const [accounts, setAccounts] = useState([
        {
            id: 0,
            name: '',
            balance: -1,
        },
    ])

    const [accountName, setAccountName] = useState('')
    const [accountBalance, setAccountBalance] = useState('')

    const [hasUserMaxAccount, setHasUserMaxAccount] = useState(false)
    const [showAccountForm, setShowAccountForm] = useState(false)
    const [loading, setLoading] = useState(true)

    const handleAddAccount = async () => {
        setLoading(true)
        clearAllToasts()

        try {
            await api.post(ENDPOINTS.createAccount, {
                name: accountName,
                balance: accountBalance,
            })

            showSuccessToast('Successfully added account!')
            setAccountName('')
            setAccountBalance('')

            fetchUserAccounts().then((data: any) => {
                setAccounts(data)
                setLoading(false)
            })

            setShowAccountForm(false)
        } catch (e: any) {
            showErrorToast(e?.response?.data?.Error)
            return false
        }
    }

    const dataFetchedRef = useRef(false)

    const fetchUserAccounts = async () => {
        setLoading(true)
        clearAllToasts()

        try {
            const userId: number = localStorage.getItem(
                'userId'
            ) as unknown as number

            const res: AxiosResponse = await api.get(
                ENDPOINTS.fetchUserAccounts(userId)
            )

            return res.data
        } catch (e: any) {
            showErrorToast(e?.response?.data?.Error)
            setLoading(false)
        }
    }

    useLayoutEffect(() => {
        if (dataFetchedRef.current) return
        dataFetchedRef.current = true

        fetchUserAccounts().then((data: any) => {
            setAccounts(data)
            setHasUserMaxAccount(data?.length > 4)
            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styledAccountsListWrapper}>
            {accounts?.map((account) => {
                return (
                    <Account
                        key={account.id}
                        accountName={account.name}
                        accountBalance={account.balance}
                    />
                )
            })}
            {!hasUserMaxAccount && (
                <Account
                    accountName=""
                    accountBalance={0}
                    isEmpty={true}
                    onClickHandler={() => setShowAccountForm(true)}
                />
            )}
            {showAccountForm && (
                <AccountForm
                    showModal={showAccountForm}
                    accountName={accountName}
                    accountBalance={accountBalance}
                    isLoading={loading}
                    onNameChangeHandler={setAccountName}
                    onBalanceChangeHandler={setAccountBalance}
                    onClickHandler={handleAddAccount}
                    handleModalClose={() => setShowAccountForm(false)}
                />
            )}
        </div>
    )
}
