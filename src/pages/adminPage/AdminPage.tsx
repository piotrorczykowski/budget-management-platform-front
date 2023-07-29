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
import CustomButton from '../../components/CustomButton'
import CustomSelect from '../../components/CustomSelect'
import { MailType } from '../../types/enums'
import CustomInputText from '../../components/CustomInputText'

const styledAdminPageWrapper = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
`

const styledMainContent = css`
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`

const styledUsersSection = css`
    width: 58%;
    height: 96%;

    background-color: #ffffff;
    border-radius: 2px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
`

const styledHeader = css`
    padding: 0.5em 0em 0em 1.5em;
    font-size: 24px;
    font-weight: 600;
`

const styledUsersList = css`
    padding: 0em 2em 0em 2em;
    height: 90%;
    width: 90%;

    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`

const styledPagination = css`
    display: flex;
    justify-content: center;
`

const styledRightPanel = css`
    height: 96%;
    width: 38%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const styledEmailSection = css`
    width: 96%;
    height: 48%;

    background-color: #ffffff;
    border-radius: 2px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
`

const styledEmailForm = css`
    height: 40%;
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const styledJobsSection = css`
    width: 96%;
    height: 48%;

    background-color: #ffffff;
    border-radius: 2px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
`

const styledJobForm = css`
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function AdminPage() {
    const [users, setUsers] = useState<User[] | undefined>([])

    const emailsArray: { id: number; name: string }[] = Object.values(
        MailType
    ).map((email, index) => {
        return { id: index, name: email }
    })

    const [email, setEmail] = useState('')
    const [selectedMail, setSelectedMail] = useState(emailsArray[0])

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
    const sendEmail = async () => {
        setLoading(true)
        try {
            const emailEndpoint: string =
                selectedMail.name === MailType.ResetPassword
                    ? ENDPOINTS.resetPasswordMail
                    : ENDPOINTS.userActivationMail

            await sendPost(emailEndpoint, {
                to: email,
                token: 'testToken',
            })
            setLoading(false)
        } catch (e: any) {
            setLoading(false)
            showErrorToast(e?.response?.data?.Error)
        }
    }

    const forceJobs = async () => {
        setLoading(true)
        try {
            await sendPost(ENDPOINTS.forceJobs, {})
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

            <div className={styledMainContent}>
                <div className={styledUsersSection}>
                    <div>
                        <p className={styledHeader}>Users</p>
                    </div>

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

                <div className={styledRightPanel}>
                    <div className={styledEmailSection}>
                        <p className={styledHeader}>Mails</p>

                        <div className={styledEmailForm}>
                            <CustomSelect
                                labelText="Email Template"
                                selectName="templates"
                                selected={selectedMail}
                                options={emailsArray}
                                onChangeHandler={setSelectedMail}
                            />
                            <CustomInputText
                                labelText="Email Address"
                                inputName={'emailAddress'}
                                placeholderText={'Email Address'}
                                value={email}
                                onChangeHandler={setEmail}
                            />
                            <CustomButton
                                buttonText="Send Test Email"
                                isDisabled={loading || !email.length}
                                onClickHandler={sendEmail}
                            />
                        </div>
                    </div>

                    <div className={styledJobsSection}>
                        <p className={styledHeader}>Jobs</p>

                        <div className={styledJobForm}>
                            <CustomButton
                                buttonText="Force Jobs"
                                isDisabled={loading}
                                onClickHandler={forceJobs}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
