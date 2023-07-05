import { css } from '@emotion/css'
import TopBar from '../components/TopBar'
import SearchInput from '../components/SearchInput'
import { useDebounce } from 'use-debounce'
import { useLayoutEffect, useState } from 'react'
import AccountCard from '../components/AccountCard'
import { clearAllToasts, showErrorToast } from '../utils/toastUtils'
import { AxiosResponse } from 'axios'
import { ENDPOINTS } from '../api'
import api from '../api/axios'

const styledAccountsPageWrapper = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const styledAccountsList = css`
    padding: 2em 5em 0em 5em;
`

export default function AccountsPage() {
    const [searchByValue, setSearchByValue] = useState('')
    const [searchByValueToSend] = useDebounce(searchByValue, 1000)
    const [accounts, setAccounts] = useState([
        {
            id: 0,
            name: '-',
            balance: 0,
        },
    ])

    useLayoutEffect(() => {
        const fetchUserAccounts = async (searchByValue: string) => {
            clearAllToasts()

            try {
                const userId: number = localStorage.getItem(
                    'userId'
                ) as unknown as number

                const res: AxiosResponse = await api.get(
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
    }, [searchByValueToSend])

    console.log(accounts)

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
                                name={account.name}
                                balance={account.balance}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
