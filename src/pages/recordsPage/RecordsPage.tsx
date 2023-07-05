import { css } from '@emotion/css'
import TopBar from '../../components/TopBar'
import SearchInput from '../../components/SearchInput'
import { useLayoutEffect, useState } from 'react'
import CustomSelect from '../../components/CustomSelect'
import { RecordType, SortingOptions } from '../../types/enums'
import SideBarFilter from '../../components/SideBarFilter'
import { clearAllToasts, showErrorToast } from '../../utils/toastUtils'
import { AxiosResponse } from 'axios'
import api from '../../api/axios'
import { ENDPOINTS } from '../../api'
import { RecordsFetchType } from './types'
import RecordCard from '../../components/RecordCard'
import { Pagination } from '@mui/material'
import { useDebounce } from 'use-debounce'

const styledRecordPageWrapper = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const styledRecordsPageContent = css`
    position: relative;
    height: 100%;
`

const customClassName = css`
    width: 13vw;
    flex-direction: row;
    justify-content: space-between;
    margin-left: auto;
    margin-right: 1em;
    height: 40px;
    margin-top: 1em;
`

const customInputClassName = css`
    width: 10vw;
    font-size: 15px;
    padding: 0.5em;
    font-weight: 500;
    margin-top: 0px;
`

const styledRecords = css`
    margin-left: 14vw;
    margin-top: 2vh;
    height: 85%;
    overflow-y: scroll;
`

const styledRecordsList = css`
    padding: 1em 4em 1em 4em;
`

const styledPagination = css`
    margin-left: 14vw;
    display: flex;
    justify-content: center;
`

export default function RecordsPage() {
    const sortingOptions: { id: number; name: string }[] = Object.values(
        SortingOptions
    ).map((sortingOption, index) => {
        return { id: index, name: sortingOption }
    })

    const [records, setRecords] = useState([
        {
            id: 0,
            category: '',
            date: '',
            accountName: '',
            amount: -1,
            isExpense: true,
            isTransfer: false,
            description: '',
        },
    ])

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)

    const [loading, setLoading] = useState(true)

    const [sortingOption, setSortingOption] = useState(sortingOptions[0])

    const [searchByValue, setSearchByValue] = useState('')
    const [searchByValueToSend] = useDebounce(searchByValue, 1000)
    const [recordType, setRecordType] = useState(RecordType.All)
    const [account, setAccount] = useState({ id: -1, name: '-' })
    const [category, setCategory] = useState({ id: -1, name: '-' })

    useLayoutEffect(() => {
        const fetchUserRecords = async ({
            sortingOption,
            searchByValue,
            recordType,
            accountId,
            category,
        }: RecordsFetchType) => {
            setLoading(true)
            clearAllToasts()

            try {
                const userId: number = localStorage.getItem(
                    'userId'
                ) as unknown as number

                const res: AxiosResponse = await api.get(
                    ENDPOINTS.fetchPaginatedUserRecords(
                        userId,
                        page,
                        10,
                        sortingOption,
                        searchByValue,
                        recordType,
                        accountId,
                        category
                    )
                )

                return res.data
            } catch (e: any) {
                setLoading(false)
                showErrorToast(e?.response?.data?.Error)
            }
        }

        fetchUserRecords({
            sortingOption: sortingOption.name,
            searchByValue: searchByValueToSend,
            recordType,
            accountId: account.id,
            category: category.name,
        }).then((data: any) => {
            setRecords(data?.items)
            setPageCount(data?.pageCount)
            setLoading(false)
        })
    }, [
        page,
        sortingOption,
        searchByValueToSend,
        recordType,
        account,
        category,
    ])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    return (
        <div className={styledRecordPageWrapper}>
            <TopBar pageNameText={'Records'}>
                <SearchInput
                    inputName="Search"
                    placeholderText="Search"
                    value={searchByValue}
                    onChangeHandler={setSearchByValue}
                />
            </TopBar>

            <div className={styledRecordsPageContent}>
                <CustomSelect
                    labelText="Sort by"
                    selectName="sortBy"
                    selected={sortingOption}
                    options={sortingOptions}
                    onChangeHandler={setSortingOption}
                    customInputClassName={customInputClassName}
                    customClassName={customClassName}
                />

                <SideBarFilter
                    selectedRecordType={recordType}
                    onRecordTypeChangeHandler={(e) =>
                        setRecordType(e.target.value)
                    }
                    selectedAccount={account}
                    onAccountChangeHandler={setAccount}
                    selectedCategory={category}
                    onCategoryChangeHandler={setCategory}
                />

                <div className={styledRecords}>
                    <div className={styledRecordsList}>
                        {records?.map((record) => {
                            return (
                                <RecordCard
                                    category={record.category}
                                    date={record.date}
                                    accountName={record.accountName}
                                    amount={record.amount}
                                    isExpense={record.isExpense}
                                    isTransfer={record.isTransfer}
                                />
                            )
                        })}
                    </div>
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
        </div>
    )
}
