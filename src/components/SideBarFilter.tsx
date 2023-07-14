import { css } from '@emotion/css'
import { Category, RecordType } from '../types/enums'
import { useLayoutEffect, useRef, useState } from 'react'
import CustomSelect from './CustomSelect'
import CustomInputRadio from './CustomInputRadio'
import { clearAllToasts, showErrorToast } from '../utils/toastUtils'
import { AxiosResponse } from 'axios'
import api from '../api/axios'
import { ENDPOINTS } from '../api'

const styledSideBarFilterWrapper = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 14vw;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.2);
`

const styledFilterWrapper = css`
    padding: 1em;
`

const styledHeadersWrapper = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const styledHeader = css`
    font-weight: 600;
    font-size: 20px;
`

const styledTextButton = css`
    cursor: pointer;
    border-bottom: 2px solid #ffffff;
    color: #bebfbf;

    &:hover {
        color: black;
        border-bottom: 2px solid black;
    }
`

const styledCustomSelect = css`
    width: 12vw;
    align-self: flex-start;
    margin-top: 2em;
`

const styledInputText = css`
    font-size: 16px;
    padding: 0.4em;
`

export default function SideBarFilter({
    selectedRecordType,
    onRecordTypeChangeHandler,
    selectedAccount,
    onAccountChangeHandler,
    selectedCategory,
    onCategoryChangeHandler,
}: {
    selectedRecordType: RecordType
    onRecordTypeChangeHandler: (e: any) => void
    selectedAccount: { id: number; name: string }
    onAccountChangeHandler: ({ id, name }: { id: number; name: string }) => void
    selectedCategory: { id: number; name: string }
    onCategoryChangeHandler: ({
        id,
        name,
    }: {
        id: number
        name: string
    }) => void
}) {
    const categoriesArray: { id: number; name: string }[] = Object.values(
        Category
    ).map((category, index) => {
        return { id: index, name: category }
    })
    categoriesArray.push({ id: -1, name: 'All' })

    const dataFetchedRef = useRef(false)

    const fetchUserAccounts = async () => {
        clearAllToasts()

        try {
            const userId: number = localStorage.getItem(
                'userId'
            ) as unknown as number

            const res: AxiosResponse = await api.get(
                ENDPOINTS.fetchUserAccounts(userId)
            )

            return res.data
        } catch (e: any) {
            showErrorToast(e?.response?.data?.Error)
        }
    }

    useLayoutEffect(() => {
        if (dataFetchedRef.current) return
        dataFetchedRef.current = true

        fetchUserAccounts().then((data: any) => {
            if (!data?.length) {
                return
            }

            const accounts: { id: number; name: string }[] = data?.map(
                (account: any) => {
                    return { id: account.id, name: account.name }
                }
            )
            accounts.push({ id: 0, name: 'All' })
            onCategoryChangeHandler(categoriesArray[categoriesArray.length - 1])
            onAccountChangeHandler(accounts[accounts.length - 1])
            setAccounts(accounts)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [accounts, setAccounts] = useState([{ id: -1, name: '-' }])
    const [categories] = useState(categoriesArray)

    const recordFilterOptions: {
        id: string
        name: string
        value: string
        onChangeHandler: (e: any) => void
    }[] = [
        {
            id: 'all',
            name: 'recordType',
            value: RecordType.All,
            onChangeHandler: onRecordTypeChangeHandler,
        },
        {
            id: 'expense',
            name: 'recordType',
            value: RecordType.Expense,
            onChangeHandler: onRecordTypeChangeHandler,
        },
        {
            id: 'income',
            name: 'recordType',
            value: RecordType.Income,
            onChangeHandler: onRecordTypeChangeHandler,
        },
        {
            id: 'transfer',
            name: 'recordType',
            value: RecordType.Transfer,
            onChangeHandler: onRecordTypeChangeHandler,
        },
    ]

    const resetFilters = () => {
        onCategoryChangeHandler(categoriesArray[categoriesArray.length - 1])
        onAccountChangeHandler(accounts[accounts.length - 1])
        onRecordTypeChangeHandler({ target: { value: RecordType.All } })
    }

    return (
        <div className={styledSideBarFilterWrapper}>
            <div className={styledFilterWrapper}>
                <div className={styledHeadersWrapper}>
                    <p className={styledHeader}>FILTER</p>
                    <p className={styledTextButton} onClick={resetFilters}>
                        RESET
                    </p>
                </div>

                {/* Record Type */}
                <CustomInputRadio
                    labelText="Record Type"
                    options={recordFilterOptions}
                    selectedOption={selectedRecordType}
                />

                {/* Accounts */}
                <CustomSelect
                    labelText="Account"
                    selectName="account"
                    selected={selectedAccount}
                    options={accounts}
                    onChangeHandler={onAccountChangeHandler}
                    customClassName={styledCustomSelect}
                    customInputClassName={styledInputText}
                />

                <CustomSelect
                    labelText="Category"
                    selectName="category"
                    selected={selectedCategory}
                    options={categories}
                    onChangeHandler={onCategoryChangeHandler}
                    customClassName={styledCustomSelect}
                    customInputClassName={styledInputText}
                />
            </div>
        </div>
    )
}
