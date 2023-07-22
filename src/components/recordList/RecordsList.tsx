import { css } from '@emotion/css'
import { TbMathGreater } from 'react-icons/tb'
import Record from '../Record'
import { useNavigate } from 'react-router-dom'
import { Pagination } from '@mui/material'
import { useLayoutEffect, useState } from 'react'
import { clearAllToasts, showErrorToast } from '../../utils/toastUtils'
import { AxiosResponse } from 'axios'
import { sendGet } from '../../api/axios'
import { ENDPOINTS } from '../../api'
import RecordForm from '../recordForm/RecordForm'
import { BasicApiObject } from '../../types'
import { Category, RecordType } from '../../types/enums'
import { DefaultAccountName } from '../../types/constants'
import moment from 'moment'
import { RecordObjectType } from './types'

const styledRecordsListWrapper = css`
    background-color: #ffffff;
    border-radius: 2px;
    margin: 1em;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
    position: relative;
`

const styledHeader = css`
    padding: 1em;
    font-weight: 600;
    width: 96.5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const styledRecentRecordText = css`
    padding: 0.5em;
    font-size: 24px;
`

const styledSeeAllRecords = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5em;
    border-radius: 2px;
    text-align: center;
    font-size: 18px;

    &:hover {
        background-color: #f0f0f080;
    }
`

const styledRecords = css`
    padding: 0 1em 0 1em;
`

const styledPagination = css`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 1.5em;
    padding-bottom: 2em;
`

export default function RecordsList({ refresh }: { refresh: boolean }) {
    const navigate = useNavigate()

    const [records, setRecords] = useState([
        {
            id: 0,
            category: '',
            date: '',
            amount: -1,
            isExpense: true,
            isTransfer: false,
            description: '',
            account: {
                id: 0,
                name: '',
            },
        },
    ])

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)

    const [loading, setLoading] = useState(true)

    const [showRecordForm, setShowRecordForm] = useState(false)
    const [shouldRefresh, setShouldRefresh] = useState(false)

    const categories: BasicApiObject[] = Object.values(Category).map(
        (category, index) => {
            return { id: index, name: category }
        }
    )

    const [recordId, setRecordId] = useState(-1)
    const [testTypeOfRecord, setTestTypeOfRecord] = useState(RecordType.Expense)
    const [formCategory, setFormCategory] = useState(categories[0])
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(new Date())
    const [description, setDescription] = useState('')

    const [formAccount, setFormAccount] = useState({ id: -1, name: '-' })
    const [toAccount, setToAccount] = useState({ id: -1, name: '-' })

    useLayoutEffect(() => {
        const fetchUserRecords = async () => {
            setLoading(true)
            clearAllToasts()

            try {
                const userId: number = localStorage.getItem(
                    'userId'
                ) as unknown as number

                const res: AxiosResponse = await sendGet(
                    ENDPOINTS.fetchPaginatedUserRecords(userId, page, 9)
                )

                return res.data
            } catch (e: any) {
                showErrorToast(e?.response?.data?.Error)
                setLoading(false)
            }
        }

        fetchUserRecords().then((data: any) => {
            setRecords(data?.items)
            setPageCount(data?.pageCount)
            setLoading(false)
        })
    }, [page, refresh, shouldRefresh])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const handleRecordEdit = async (recordId: number) => {
        const record: RecordObjectType = records.find(
            (record) => record.id === recordId
        ) as RecordObjectType

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
            correspondingAccount = records.find(
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

    const handleModalClose = async (refresh: boolean) => {
        if (refresh) {
            setShouldRefresh(!shouldRefresh)
        }
        setShowRecordForm(false)
    }

    return (
        <div className={styledRecordsListWrapper}>
            <div className={styledHeader}>
                <p className={styledRecentRecordText}>Recent Records</p>

                <div
                    className={styledSeeAllRecords}
                    onClick={() => navigate('/records')}
                >
                    <p>See All</p>
                    <TbMathGreater size="15px" />
                </div>
            </div>
            <div className={styledRecords}>
                {records?.map((record) => {
                    return (
                        <Record
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
