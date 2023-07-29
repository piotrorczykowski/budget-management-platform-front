import { css } from '@emotion/css'
import TopBar from '../../components/TopBar'
import UserCard from '../../components/UserCard'
import { Pagination } from '@mui/material'
import { useLayoutEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import SearchInput from '../../components/SearchInput'
import { AxiosResponse } from 'axios'
import { clearAllToasts, showErrorToast } from '../../utils/toastUtils'
import { sendGet, sendPost } from '../../api/axios'
import { ENDPOINTS } from '../../api'
import { User } from './types'

const styledAdminPageWrapper = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const styledUsersList = css`
    padding: 2em 5em 0em 5em;
    height: 83%;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`

const styledPagination = css`
    display: flex;
    justify-content: center;
`

export default function AdminPage() {
    const [users, setUsers] = useState<User[] | undefined>([])

    const [searchByValue, setSearchByValue] = useState('')
    const [searchByValueToSend] = useDebounce(searchByValue, 1000)

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState<number | undefined>(undefined)

    const [loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        const fetchUsers = async (searchByValue: string) => {
            setLoading(true)
            clearAllToasts()

            try {
                const res: AxiosResponse = await sendGet(
                    ENDPOINTS.fetchPaginatedUsers(page, 10, searchByValue)
                )

                return res.data
            } catch (e: any) {
                setLoading(false)
                showErrorToast(e?.response?.data?.Error)
            }
        }

        fetchUsers(searchByValueToSend).then((data: any) => {
            setUsers(data?.items)
            setPageCount(data?.pageCount || 1)
            setLoading(false)
        })
    }, [page, searchByValueToSend])

    const handleResendActivationMail = async (userId: number) => {
        setLoading(true)
        try {
            const email: string = (users as User[]).find(
                (user) => user.id === userId
            )?.email as string

            await sendPost(ENDPOINTS.resendActivationEmail, {
                email: email,
            })
            setLoading(false)
        } catch (e: any) {
            setLoading(false)
            showErrorToast(e?.response?.data?.Error)
        }
    }

    const handleForgotPassword = async (userId: number) => {
        setLoading(true)
        try {
            const email: string = (users as User[]).find(
                (user) => user.id === userId
            )?.email as string

            await sendPost(ENDPOINTS.forgotPassword, {
                email: email,
            })
            setLoading(false)
        } catch (e: any) {
            setLoading(false)
            showErrorToast(e?.response?.data?.Error)
        }
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    return (
        <div className={styledAdminPageWrapper}>
            <TopBar pageNameText={'Admin Panel'}>
                <SearchInput
                    inputName="Search"
                    placeholderText="Search"
                    value={searchByValue}
                    onChangeHandler={setSearchByValue}
                />
            </TopBar>

            <div className={styledUsersList}>
                {users?.map((user) => {
                    return (
                        <UserCard
                            key={user.id}
                            id={user.id}
                            fullName={user.fullName}
                            email={user.email}
                            isActive={user.isActive}
                            handleResendActivationMail={
                                handleResendActivationMail
                            }
                            handleForgotPassword={handleForgotPassword}
                        />
                    )
                })}
            </div>

            <div className={styledPagination}>
                <Pagination
                    page={page}
                    count={pageCount}
                    size="medium"
                    shape="rounded"
                    disabled={loading}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
