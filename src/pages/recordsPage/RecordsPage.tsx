import { css } from '@emotion/css'
import TopBar from '../../components/TopBar'
import SearchInput from '../../components/SearchInput'
import { useLayoutEffect, useState } from 'react'
import CustomSelect from '../../components/CustomSelect'
import { Category, RecordType, SortingOptions } from '../../types/enums'
import SideBarFilter from '../../components/SideBarFilter'
import { clearAllToasts, showErrorToast } from '../../utils/toastUtils'
import { AxiosResponse } from 'axios'
import api, { sendGet } from '../../api/axios'
import { ENDPOINTS } from '../../api'
import { RecordsFetchType } from './types'
import RecordCard from '../../components/RecordCard'
import { Pagination } from '@mui/material'
import { useDebounce } from 'use-debounce'
import RecordForm from '../../components/recordForm/RecordForm'
import { BasicApiObject } from '../../types'
import { Record } from './types/index'
import moment from 'moment'
import { DefaultAccountName } from '../../types/constants'
import InfoCard from '../../components/InfoCard'

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
    height: 86%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
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

    const [records, setRecords] = useState<Record[] | undefined>([])

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState<number | undefined>(undefined)

    const [loading, setLoading] = useState(true)

    const [sortingOption, setSortingOption] = useState(
        sortingOptions.find(
            (sortingOption) => sortingOption.name === 'Date (new to old)'
        ) as BasicApiObject
    )

    const [searchByValue, setSearchByValue] = useState('')
    const [searchByValueToSend] = useDebounce(searchByValue, 1000)
    const [recordType, setRecordType] = useState(RecordType.All)
    const [account, setAccount] = useState({ id: 0, name: '-' })
    const [category, setCategory] = useState({ id: -1, name: 'All' })

    const [refresh, setRefresh] = useState(false)
    const [showRecordForm, setShowRecordForm] = useState(false)

    const categories: BasicApiObject[] = [
        ...Object.values(Category).map((category, index) => {
            return { id: index, name: category }
        }),
    ]

    const [recordId, setRecordId] = useState(-1)
    const [testTypeOfRecord, setTestTypeOfRecord] = useState(RecordType.Expense)
    const [formCategory, setFormCategory] = useState(categories[0])
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(new Date())
    const [description, setDescription] = useState('')

    const [formAccount, setFormAccount] = useState({ id: -1, name: '-' })
    const [toAccount, setToAccount] = useState({ id: -1, name: '-' })

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

                const res: AxiosResponse = await sendGet(
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
            setPageCount(data?.pageCount || 1)
            setLoading(false)
        })
    }, [
        page,
        sortingOption,
        searchByValueToSend,
        recordType,
        account,
        category,
        refresh,
    ])

    useLayoutEffect(() => {
        setPage(1)
    }, [searchByValueToSend, recordType, account, category])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const handleRecordEdit = async (recordId: number) => {
        const record: Record = (records as any as Record[]).find(
            (record) => record.id === recordId
        ) as Record

        const selectedRecordType: RecordType = record.isTransfer
            ? RecordType.Transfer
            : record.isExpense
            ? RecordType.Expense
            : RecordType.Income

        const category: BasicApiObject = categories.find(
            (category) => category.name === record.category
        ) as BasicApiObject

        const recordAccount: BasicApiObject = {
            id: record.account?.id || 0,
            name: record.account?.name || DefaultAccountName,
        }

        const isRecordTransfer: boolean = record.isTransfer
        const isRecordTransferAndExpense: boolean = record.isExpense
        let correspondingAccount: BasicApiObject = {
            id: 0,
            name: DefaultAccountName,
        }
        if (isRecordTransfer) {
            correspondingAccount = (records as any as Record[]).find(
                (r) =>
                    r.isTransfer &&
                    r.date === record.date &&
                    r.isExpense === !isRecordTransferAndExpense
            )?.account || { id: 0, name: DefaultAccountName }

            if (isRecordTransferAndExpense) {
                setFormAccount(recordAccount)
                setToAccount(correspondingAccount)
            } else {
                setFormAccount(correspondingAccount)
                setToAccount(recordAccount)
            }
        } else {
            setFormAccount(recordAccount)
            setToAccount(correspondingAccount)
        }

        setRecordId(record.id)
        setTestTypeOfRecord(selectedRecordType)
        setFormCategory(category)
        setAmount(record.amount.toString())
        setDate(moment(record.date).toDate())
        setDescription(record.description)

        setShowRecordForm(true)
    }

    const handleRecordDelete = async (recordId: number) => {
        setLoading(true)
        try {
            await api.delete(ENDPOINTS.deleteRecord(recordId))
            setRefresh(!refresh)
            setLoading(false)
        } catch (e: any) {
            setLoading(false)
            showErrorToast(e?.response?.data?.Error)
        }
    }

    const handleModalClose = async (shouldRefresh: boolean) => {
        if (shouldRefresh) {
            setRefresh(!refresh)
        }
        setShowRecordForm(false)
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
                                    key={record.id}
                                    id={record.id}
                                    category={record.category}
                                    date={record.date}
                                    accountName={record.account.name}
                                    amount={record.amount}
                                    isExpense={record.isExpense}
                                    isTransfer={record.isTransfer}
                                    description={record.description}
                                    handleRecordEdit={handleRecordEdit}
                                    handleRecordDelete={handleRecordDelete}
                                />
                            )
                        })}
                        {!records?.length && (
                            <InfoCard message="There are no records to be displayed" />
                        )}
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
            {showRecordForm && (
                <RecordForm
                    id={recordId}
                    recordType={testTypeOfRecord}
                    category={formCategory}
                    amount={amount}
                    date={date}
                    description={description}
                    account={formAccount}
                    toAccount={toAccount}
                    handleSetRecordType={setTestTypeOfRecord}
                    handleSetCategory={setFormCategory}
                    handleSetAmount={setAmount}
                    handleSetDate={setDate}
                    handleSetDescription={setDescription}
                    handleSetAccount={setFormAccount}
                    handleSetToAccount={setToAccount}
                    handleModalClose={handleModalClose}
                    showModal={showRecordForm}
                    isRecordUpdating={true}
                    showRecordType={false}
                />
            )}
        </div>
    )
}
