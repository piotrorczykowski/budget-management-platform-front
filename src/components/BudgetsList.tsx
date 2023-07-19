import { css } from '@emotion/css'
import { TbMathGreater } from 'react-icons/tb'
import Budget from './Budget'
import { useNavigate } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'
import { Pagination } from '@mui/material'
import { AxiosResponse } from 'axios'
import { sendGet } from '../api/axios'
import { ENDPOINTS } from '../api'
import { showErrorToast } from '../utils/toastUtils'

const styledBudgetsListWrapper = css`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 2px;
    margin: 1em;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
`

const styledHeader = css`
    padding: 1em;
    font-weight: 600;
    width: 95%;
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

const styledBudgets = css`
    padding: 0 1em 0 1em;
    height: 82%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`

const styledPagination = css`
    display: flex;
    justify-content: center;
    margin-top: 1em;
`

export default function BudgetsList({ refresh }: { refresh: boolean }) {
    const navigate = useNavigate()

    const [budgets, setBudgets] = useState([
        {
            id: 0,
            name: '-',
            planned: 0,
            spent: 0,
            startDate: new Date(),
            endDate: new Date(),
            categories: [],
        },
    ])

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)
    const [loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        const fetchUserBudgets = async () => {
            try {
                const userId: number = localStorage.getItem(
                    'userId'
                ) as unknown as number

                const res: AxiosResponse = await sendGet(
                    ENDPOINTS.fetchPaginatedUserBudgets(userId, page, 10)
                )

                return res.data
            } catch (e: any) {
                setLoading(false)
                showErrorToast(e?.response?.data?.Error)
            }
        }

        fetchUserBudgets().then((data: any) => {
            setBudgets(data?.items)
            setPageCount(data?.pageCount)
            setLoading(false)
        })
    }, [page, refresh])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    return (
        <div className={styledBudgetsListWrapper}>
            <div className={styledHeader}>
                <p className={styledRecentRecordText}>Budgets</p>

                <div
                    className={styledSeeAllRecords}
                    onClick={() => navigate('/budgets')}
                >
                    <p>See All</p>
                    <TbMathGreater size="15px" />
                </div>
            </div>
            <div className={styledBudgets}>
                {budgets?.map((budget) => {
                    return (
                        <Budget
                            key={budget.id}
                            id={budget.id}
                            name={budget.name}
                            planned={budget.planned}
                            spent={budget.spent}
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
