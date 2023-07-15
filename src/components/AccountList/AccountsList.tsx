import { css } from '@emotion/css'
import Account from '../Account'
import AccountForm from '../AccountForm'
import { useLayoutEffect, useState } from 'react'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../../utils/toastUtils'
import { sendGet, sendPost, sendPut } from '../../api/axios'
import { ENDPOINTS } from '../../api'
import { AxiosResponse } from 'axios'
import { AccountType } from './types/index'

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

    const [accountId, setAccountId] = useState(0)
    const [accountName, setAccountName] = useState('')
    const [accountBalance, setAccountBalance] = useState('')

    const [hasUserMaxAccount, setHasUserMaxAccount] = useState(false)
    const [showAccountForm, setShowAccountForm] = useState(false)
    const [loading, setLoading] = useState(true)

    const [isAccountUpdating, setIsAccountUpdating] = useState(false)
    const [shouldRefresh, setShouldRefresh] = useState(false)

    const handleUpsertAccount = async () => {
        setErrorMessage('')
        setLoading(true)
        clearAllToasts()

        if (!accountName.length) {
            setErrorMessage('Account Name cannot be empty')
            setLoading(false)
            return
        }

        try {
            if (isAccountUpdating) {
                await sendPut(ENDPOINTS.updateAccount(accountId), {
                    name: accountName,
                    balance: accountBalance,
                })

                setShouldRefresh(true)
                showSuccessToast('Successfully updated account!')
            } else {
                await sendPost(ENDPOINTS.createAccount, {
                    name: accountName,
                    balance: accountBalance,
                })

                showSuccessToast('Successfully added account!')
            }
            setAccountName('')
            setAccountBalance('')

            fetchUserAccounts().then((data: any) => {
                setAccounts(data)
                setLoading(false)
            })

            setShowAccountForm(false)
            setIsAccountUpdating(false)
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

            const res: AxiosResponse = await sendGet(
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
    }, [refresh, shouldRefresh])

    const handleAccountBalanceChange = (value: string) => {
        const regex: RegExp = /[^0-9.]/g
        const transformedAmount: string = value.replace(regex, '')
        setAccountBalance(transformedAmount)
    }

    const handleAccountUpdate = (accountId: number) => {
        setErrorMessage('')
        const account: AccountType = accounts.find(
            (account) => account.id === accountId
        ) as AccountType

        setAccountName(account.name)
        setAccountBalance(account.balance.toString())
        setAccountId(accountId)
        setShowAccountForm(true)
        setIsAccountUpdating(true)
    }

    const handleFormClose = () => {
        setShowAccountForm(false)
        setIsAccountUpdating(false)
    }

    const handleAccountCreation = (accountId: number) => {
        setShowAccountForm(true)
    }

    return (
        <div className={styledAccountsListWrapper}>
            {accounts?.map((account) => {
                return (
                    <Account
                        key={account.id}
                        id={account.id}
                        accountName={account.name}
                        accountBalance={account.balance}
                        onClickHandler={handleAccountUpdate}
                    />
                )
            })}
            {!hasUserMaxAccount && (
                <Account
                    key={-1}
                    id={-1}
                    accountName=""
                    accountBalance={0}
                    isEmpty={true}
                    onClickHandler={handleAccountCreation}
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
                    onClickHandler={handleUpsertAccount}
                    handleModalClose={() => handleFormClose()}
                    errorMessage={errorMessage}
                    isAccountUpdating={isAccountUpdating}
                />
            )}
        </div>
    )
}
