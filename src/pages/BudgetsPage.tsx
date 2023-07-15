import { css } from '@emotion/css'
import TopBar from '../components/TopBar'
import SearchInput from '../components/SearchInput'
import { useState } from 'react'
import TopBarButton from '../components/TopBarButton'
import { Pagination } from '@mui/material'
import BudgetCard from '../components/BudgetCard'

const styledBudgetsPageWrapper = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const styledBudgetsList = css`
    padding: 2em 5em 0em 5em;
    height: 83%;
    overflow-y: scroll;
`

const styledPagination = css`
    display: flex;
    justify-content: center;
`

export default function BudgetsPage() {
    const [searchByValue, setSearchByValue] = useState('')
    const [showBudgetForm, setShowBudgetForm] = useState(false)

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)
    const [loading, setLoading] = useState(true)

    const [budgets, setBudgets] = useState([
        // {
        //     id: 0,
        //     name: '-',
        //     planned: 0,
        //     spent: 0,
        //     startDate: new Date(),
        //     endDate: new Date(),
        //     categories: [],
        // },
        {
            id: 0,
            name: 'Main',
            planned: 2000,
            spent: 20,
            startDate: new Date(),
            endDate: new Date(),
            categories: ['Food'],
        },
    ])

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
