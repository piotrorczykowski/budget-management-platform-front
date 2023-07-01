import { css } from '@emotion/css'
import { RecordType } from '../types/enums'
import { useState } from 'react'
import CustomSelect from './CustomSelect'

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

const styledHeader = css`
    font-weight: 600;
    font-size: 20px;
`

const styledInput = css`
    cursor: pointer;
`

const styledLabel = css``

const styledCustomSelect = css`
    width: 12vw;
    align-self: flex-start;
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
    const [accounts, setAccounts] = useState([{ id: -1, name: '-' }])
    const [categories, setCategories] = useState([{ id: -1, name: '-' }])

    return (
        <div className={styledSideBarFilterWrapper}>
            <div className={styledFilterWrapper}>
                <p className={styledHeader}>FILTER</p>

                {/* Record Type */}
                <fieldset>
                    <p>Record Type</p>
                    <div>
                        <input
                            type="radio"
                            id="all"
                            name="recordType"
                            className={styledInput}
                            value={RecordType.All}
                            checked={selectedRecordType === RecordType.All}
                            onChange={onRecordTypeChangeHandler}
                        />
                        <label className={styledLabel} htmlFor="all">
                            {RecordType.All}
                        </label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id="expense"
                            name="recordType"
                            className={styledInput}
                            value={RecordType.Expense}
                            checked={selectedRecordType === RecordType.Expense}
                            onChange={onRecordTypeChangeHandler}
                        />
                        <label className={styledLabel} htmlFor="expense">
                            {RecordType.Expense}
                        </label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id="income"
                            name="recordType"
                            value={RecordType.Income}
                            checked={selectedRecordType === RecordType.Income}
                            onChange={onRecordTypeChangeHandler}
                        />
                        <label htmlFor="income">{RecordType.Income}</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id="transfer"
                            name="recordType"
                            value={RecordType.Transfer}
                            checked={selectedRecordType === RecordType.Transfer}
                            onChange={onRecordTypeChangeHandler}
                        />
                        <label htmlFor="transfer">{RecordType.Transfer}</label>
                    </div>
                </fieldset>

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
