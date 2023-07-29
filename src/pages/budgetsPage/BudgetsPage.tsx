import { css } from '@emotion/css'
import TopBar from '../../components/TopBar'
import SearchInput from '../../components/SearchInput'
import { useLayoutEffect, useState } from 'react'
import TopBarButton from '../../components/TopBarButton'
import { Pagination } from '@mui/material'
import BudgetCard from '../../components/BudgetCard'
import { useDebounce } from 'use-debounce'
import { AxiosResponse } from 'axios'
import { sendDelete, sendGet } from '../../api/axios'
import { showErrorToast } from '../../utils/toastUtils'
import { ENDPOINTS } from '../../api'
import { Budget } from './types'
import moment from 'moment'
import BudgetForm from '../../components/budgetForm/BudgetForm'
import InfoCard from '../../components/InfoCard'

const styledBudgetsPageWrapper = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const styledBudgetsList = css`
    padding: 2em 5em 0em 5em;
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

export default function BudgetsPage() {
    const [budgetId, setBudgetId] = useState(-1)
    const [isBudgetUpdating, setIsBudgetUpdating] = useState(false)

    const [searchByValue, setSearchByValue] = useState('')
    const [searchByValueToSend] = useDebounce(searchByValue, 1000)

    const [showBudgetForm, setShowBudgetForm] = useState(false)

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState<number | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)

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

    const [budgets, setBudgets] = useState<Budget[] | undefined>([])

    useLayoutEffect(() => {
        const fetchUserBudgets = async (searchByValue: string) => {
            try {
                const userId: number = localStorage.getItem(
                    'userId'
                ) as unknown as number

                const res: AxiosResponse = await sendGet(
                    ENDPOINTS.fetchPaginatedUserBudgets(
                        userId,
                        page,
                        5,
                        searchByValue
                    )
                )

                return res.data
            } catch (e: any) {
                setLoading(false)
                showErrorToast(e?.response?.data?.Error)
            }
        }

        fetchUserBudgets(searchByValueToSend).then((data: any) => {
            setBudgets(data?.items)
            setPageCount(data?.pageCount || 1)
            setLoading(false)
        })
    }, [page, searchByValueToSend, refresh])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const handleModalClose = (shouldRefresh: boolean) => {
        if (shouldRefresh) {
            setRefresh(!refresh)
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
        setIsBudgetUpdating(false)
    }

    const handleBudgetEdit = async (budgetId: number) => {
        const budget: Budget = (budgets as any as Budget[]).find(
            (budget) => budget.id === budgetId
        ) as Budget

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

        setIsBudgetUpdating(true)
        setShowBudgetForm(true)
    }

    const handleBudgetDelete = async (budgetId: number) => {
        setLoading(true)
        try {
            await sendDelete(ENDPOINTS.deleteBudget(budgetId))
            setRefresh(!refresh)
            setLoading(false)
        } catch (e: any) {
            setLoading(false)
            showErrorToast(e?.response?.data?.Error)
        }
    }

    return (
        <div className={styledBudgetsPageWrapper}>
            <TopBar pageNameText={'Budgets'}>
                <SearchInput
                    inputName="Search"
                    placeholderText="Search"
                    value={searchByValue}
                    onChangeHandler={setSearchByValue}
                />
                <TopBarButton
                    buttonText="Add Budget"
                    onClickHandler={() => setShowBudgetForm(true)}
                />
            </TopBar>

            <div className={styledBudgetsList}>
                {budgets?.map((budget) => {
                    return (
                        <BudgetCard
                            key={budget.id}
                            id={budget.id}
                            name={budget.name}
                            planned={budget.planned}
                            spent={budget.spent}
                            startDate={budget.startDate}
                            endDate={budget.endDate}
                            categories={budget.categories}
                            handleBudgetEdit={handleBudgetEdit}
                            handleBudgetDelete={handleBudgetDelete}
                        />
                    )
                })}
                {!budgets?.length && (
                    <InfoCard message="There are no budgets to be displayed" />
                )}
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
                    isBudgetUpdating={isBudgetUpdating}
                />
            )}
        </div>
    )
}
