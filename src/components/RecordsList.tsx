import { css } from '@emotion/css'
import { TbMathGreater } from 'react-icons/tb'
import Record from './Record'
import { useNavigate } from 'react-router-dom'
import { Pagination } from '@mui/material'
import { useLayoutEffect, useState } from 'react'
import { clearAllToasts, showErrorToast } from '../utils/toastUtils'
import { AxiosResponse } from 'axios'
import api from '../api/axios'
import { ENDPOINTS } from '../api'

const styledRecordsListWrapper = css`
    width: 97.5%;
    height: 100%;
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
    position: absolute;
    bottom: 0;
    margin-bottom: 2em;
`

export default function RecordsList() {
    const navigate = useNavigate()

    const [records, setRecords] = useState([
        {
            id: 0,
            category: '',
            date: '',
            accountName: '',
            amount: -1,
            isExpense: true,
            description: '',
        },
    ])

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)

    const [loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        const fetchUserRecords = async () => {
            setLoading(true)
            clearAllToasts()

            try {
                const userId: number = localStorage.getItem(
                    'userId'
                ) as unknown as number

                const res: AxiosResponse = await api.get(
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
    }, [page])

    console.log(page)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
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
                {records.map((record) => {
                    return (
                        <Record
                            key={record.id}
                            category={record.category}
                            date={record.date}
                            accountName={record.accountName}
                            amount={record.amount}
                            isExpense={record.isExpense}
                            description={record.description}
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
