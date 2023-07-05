import { css } from '@emotion/css'
import Account from './Account'
import AccountForm from './AccountForm'
import { useLayoutEffect, useState } from 'react'
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

export default function AccountsList({ refresh }: { refresh: boolean }) {
    const [errorMessage, setErrorMessage] = useState('')
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
        setErrorMessage('')
        setLoading(true)
        clearAllToasts()

        if (!accountName.length) {
            setErrorMessage('Account Name cannot be empty')
            setLoading(false)
            return
        }

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
            setLoading(false)
            showErrorToast(e?.response?.data?.Error)
        }
    }

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
        fetchUserAccounts().then((data: any) => {
            setAccounts(data)
            setHasUserMaxAccount(data?.length > 4)
            setLoading(false)
        })
    }, [refresh])

    const handleAccountBalanceChange = (value: string) => {
        const regex: RegExp = /[^0-9.]/g
        const transformedAmount: string = value.replace(regex, '')
        setAccountBalance(transformedAmount)
    }

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
                    onBalanceChangeHandler={handleAccountBalanceChange}
                    onClickHandler={handleAddAccount}
                    handleModalClose={() => setShowAccountForm(false)}
                    errorMessage={errorMessage}
                />
            )}
        </div>
    )
}
