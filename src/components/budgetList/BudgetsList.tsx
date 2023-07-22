import { css } from '@emotion/css'
import { TbMathGreater } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'
import { Pagination } from '@mui/material'
import { AxiosResponse } from 'axios'

import moment from 'moment'
import { ENDPOINTS } from '../../api'
import { sendGet } from '../../api/axios'
import { showErrorToast } from '../../utils/toastUtils'
import Budget from '../Budget'
import BudgetForm from '../budgetForm/BudgetForm'
import { BudgetType } from './types'

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
    height: 83%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`

const styledPagination = css`
    display: flex;
    justify-content: center;
    margin-top: 0.5em;
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
    const [shouldRefresh, setShouldRefresh] = useState(true)

    const [showBudgetForm, setShowBudgetForm] = useState(false)

    const [budgetId, setBudgetId] = useState(-1)

    const [budgetName, setBudgetName] = useState('')
    const [planned, setPlanned] = useState('')

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [selectedCategories, setSelectedCategories] = useState([
        {
            value: '',
            label: '',
        },
    ])

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
    }, [page, refresh, shouldRefresh])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const handleModalClose = (refresh: boolean) => {
        if (refresh) {
            setShouldRefresh(!shouldRefresh)
        }
        setShowBudgetForm(false)
        setBudgetName('')
        setPlanned('')
        setStartDate(new Date())
        setEndDate(new Date())
        setSelectedCategories([
            {
                value: '',
                label: '',
            },
        ])
    }

    const handleBudgetEdit = async (budgetId: number) => {
        const budget: BudgetType = budgets.find(
            (budget) => budget.id === budgetId
        ) as BudgetType

        setBudgetName(budget.name)
        setPlanned(budget.planned.toString())
        setStartDate(moment(budget.startDate).utc().toDate())
        setEndDate(moment(budget.endDate).utc().toDate())
        setSelectedCategories(
            budget.categories.map((category) => {
                return { value: category, label: category }
            })
        )
        setBudgetId(budget.id)

        setShowBudgetForm(true)
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
                            handleBudgetEdit={handleBudgetEdit}
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

            {showBudgetForm && (
                <BudgetForm
                    showModal={showBudgetForm}
                    id={budgetId}
                    budgetName={budgetName}
                    planned={planned}
                    startDate={startDate}
                    endDate={endDate}
                    selectedCategories={selectedCategories}
                    handleSetBudgetName={setBudgetName}
                    handleSetPlanned={setPlanned}
                    handleModalClose={handleModalClose}
                    handleSetStartDate={setStartDate}
                    handleSetEndDate={setEndDate}
                    handleSetSelectedCategories={setSelectedCategories}
                    isBudgetUpdating={true}
                />
            )}
        </div>
    )
}
