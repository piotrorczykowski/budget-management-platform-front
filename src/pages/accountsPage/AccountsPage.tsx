import { css } from '@emotion/css'
import TopBar from '../../components/TopBar'
import SearchInput from '../../components/SearchInput'
import { useDebounce } from 'use-debounce'
import { useLayoutEffect, useState } from 'react'
import AccountCard from '../../components/AccountCard'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../../utils/toastUtils'
import { AxiosResponse } from 'axios'
import { ENDPOINTS } from '../../api'
import api, { sendGet, sendPut } from '../../api/axios'
import { Account } from './types'
import AccountForm from '../../components/AccountForm'

const styledAccountsPageWrapper = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const styledAccountsList = css`
    padding: 2em 5em 0em 5em;
`

export default function AccountsPage() {
    const [shouldRefresh, setShouldRefresh] = useState(false)
    const [showAccountForm, setShowAccountForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const [searchByValue, setSearchByValue] = useState('')
    const [searchByValueToSend] = useDebounce(searchByValue, 1000)
    const [accounts, setAccounts] = useState([
        {
            id: 0,
            name: '-',
            balance: 0,
        },
    ])

    const [accountId, setAccountId] = useState(0)
    const [accountName, setAccountName] = useState('')
    const [accountBalance, setAccountBalance] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    useLayoutEffect(() => {
        const fetchUserAccounts = async (searchByValue: string) => {
            clearAllToasts()

            try {
                const userId: number = localStorage.getItem(
                    'userId'
                ) as unknown as number

                const res: AxiosResponse = await sendGet(
                    ENDPOINTS.fetchUserAccounts(userId, searchByValue)
                )

                return res.data
            } catch (e: any) {
                showErrorToast(e?.response?.data?.Error)
            }
        }

        fetchUserAccounts(searchByValueToSend).then((data: any) => {
            setAccounts(data)
        })
    }, [searchByValueToSend, shouldRefresh])

    const handleAccountDelete = async (accountId: number) => {
        setLoading(true)
        try {
            await api.delete(ENDPOINTS.deleteAccount(accountId))
            setShouldRefresh(true)
            setLoading(false)
        } catch (e: any) {
            setLoading(false)
            showErrorToast(e?.response?.data?.Error)
        }
    }

    const handleAccountEdit = async (accountId: number) => {
        setErrorMessage('')
        const account: Account = accounts.find(
            (account) => account.id === accountId
        ) as Account
        setAccountName(account.name)
        setAccountBalance(account.balance.toString())
        setAccountId(accountId)
        setShowAccountForm(true)
    }

    const updateAccount = async () => {
        setLoading(true)
        if (!accountName.length) {
            setErrorMessage('Account Name cannot be empty')
            setLoading(false)
            return
        }
        try {
            await sendPut(ENDPOINTS.updateAccount(accountId), {
                name: accountName,
                balance: accountBalance,
            })
            setShouldRefresh(true)
            showSuccessToast('Successfully updated account!')
            setAccountName('')
            setAccountBalance('')
            setLoading(false)
            setShowAccountForm(false)
        } catch (e: any) {
            setLoading(false)
            showErrorToast(e?.response?.data?.Error)
        }
    }

    const handleAccountBalanceChange = (value: string) => {
        const regex: RegExp = /[^0-9.]/g
        const transformedAmount: string = value.replace(regex, '')
        setAccountBalance(transformedAmount)
    }

    return (
        <div className={styledAccountsPageWrapper}>
            <TopBar pageNameText={'Accounts'}>
                <SearchInput
                    inputName="Search"
                    placeholderText="Search"
                    value={searchByValue}
                    onChangeHandler={setSearchByValue}
                />
            </TopBar>

            <div>
                <div className={styledAccountsList}>
                    {accounts?.map((account) => {
                        return (
                            <AccountCard
                                key={account.id}
                                id={account.id}
                                name={account.name}
                                balance={account.balance}
                                handleAccountEdit={handleAccountEdit}
                                handleAccountDelete={handleAccountDelete}
                            />
                        )
                    })}
                </div>
            </div>

            {showAccountForm && (
                <AccountForm
                    showModal={showAccountForm}
                    accountName={accountName}
                    accountBalance={accountBalance}
                    isLoading={loading}
                    onNameChangeHandler={setAccountName}
                    onBalanceChangeHandler={handleAccountBalanceChange}
                    onClickHandler={updateAccount}
                    handleModalClose={() => setShowAccountForm(false)}
                    errorMessage={errorMessage}
                    isAccountUpdating={true}
                />
            )}
        </div>
    )
}
