import { css } from '@emotion/css'
import TopBar from '../components/TopBar'
import SearchInput from '../components/SearchInput'
import { useLayoutEffect, useState } from 'react'
import TopBarButton from '../components/TopBarButton'
import { Pagination } from '@mui/material'
import BudgetCard from '../components/BudgetCard'
import { useDebounce } from 'use-debounce'
import { AxiosResponse } from 'axios'
import { sendGet } from '../api/axios'
import { showErrorToast } from '../utils/toastUtils'
import { ENDPOINTS } from '../api'

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
    const [searchByValue, setSearchByValue] = useState('')
    const [searchByValueToSend] = useDebounce(searchByValue, 1000)

    const [showBudgetForm, setShowBudgetForm] = useState(false)

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)

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
            setPageCount(data?.pageCount)
            setLoading(false)
        })
    }, [page, searchByValueToSend, refresh])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
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
