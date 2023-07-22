import { css } from '@emotion/css'
import Account from '../Account'
import AccountForm from '../AccountForm'
import { useEffect, useLayoutEffect, useState } from 'react'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../../utils/toastUtils'
import { sendGet, sendPost, sendPut } from '../../api/axios'
import { ENDPOINTS } from '../../api'
import { AxiosResponse } from 'axios'
import { AccountType, FormErrorsType } from './types/index'
import { InitialValues } from './types/constants'

const styledAccountsListWrapper = css`
    display: flex;
`

export default function AccountsList({ refresh }: { refresh: boolean }) {
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

    const [formErrors, setFormErrors] = useState({ ...InitialValues })

    const validate = () => {
        const errors: FormErrorsType = { ...InitialValues }

        if (!accountName.length) {
            errors.accountName = 'Account Name cannot be empty'
        }

        if (!accountBalance.length) {
            errors.accountBalance = 'Balance cannot be empty'
        }

        return errors
    }

    useEffect(() => {
        const isFormValid: boolean = Object.values(formErrors).every(
            (errorMessage: string) => !errorMessage.length
        )

        if (!isFormValid) {
            const errors: FormErrorsType = validate()
            setFormErrors(errors)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountName, accountBalance])

    const handleUpsertAccount = async () => {
        setLoading(true)
        clearAllToasts()

        const errors: FormErrorsType = validate()
        setFormErrors(errors)

        const isFormValid: boolean = Object.values(errors).every(
            (errorMessage: string) => !errorMessage.length
        )

        if (!isFormValid) {
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
        setAccountName('')
        setAccountBalance('')
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
                    errorMessages={formErrors}
                    isAccountUpdating={isAccountUpdating}
                />
            )}
        </div>
    )
}
