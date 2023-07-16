import { css } from '@emotion/css'
import CustomButton from '../CustomButton'
import CustomInputText from '../CustomInputText'
import { useState } from 'react'
import CustomDatePicker from '../CustomDatePicker'
import CustomMultiSelect from '../CustomMultiSelect'
import { Category } from '../../types/enums'
import { SelectOptionType } from './types'

const styledBudgetFormWrapper = (showModal: boolean) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    ${showModal ? 'display: block;' : 'display: none;'}
`

const styledModal = css`
    position: fixed;
    background: white;
    width: 35%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const styledModalName = css`
    font-weight: 600;
    font-size: 40px;
`

const styledDates = css`
    width: 25vw;
    display: flex;
    justify-content: space-between;
`

const smallerInput = css`
    width: 12vw;
`

export default function BudgetForm({
    showModal,
    budgetName,
    planned,
    startDate,
    endDate,
    selectedCategories,
    handleSetBudgetName,
    handleSetPlanned,
    handleSetStartDate,
    handleSetEndDate,
    handleModalClose,
    handleSetSelectedCategories,
}: {
    showModal: boolean
    budgetName: string
    planned: string
    startDate: Date
    endDate: Date
    selectedCategories: SelectOptionType[]
    handleSetBudgetName: (budgetName: string) => void
    handleSetPlanned: (planned: string) => void
    handleSetStartDate: (startDate: Date) => void
    handleSetEndDate: (endDate: Date) => void
    handleModalClose: (shouldRefresh: boolean) => void
    handleSetSelectedCategories: (selectedOption: SelectOptionType[]) => void
}) {
    const categories: SelectOptionType[] = Object.values(Category).map(
        (category) => {
            return { value: category, label: category }
        }
    )

    const [loading, setLoading] = useState(false)

    const handleChange = (selectedOption: SelectOptionType[]) => {
        handleSetSelectedCategories(selectedOption)
    }

    const handleAddBudget = async () => {
        console.log('handleAddBudget')
        console.log(budgetName)
        console.log(planned)
        console.log(startDate)
        console.log(endDate)
        console.log(selectedCategories)
    }

    return (
        <div className={styledBudgetFormWrapper(showModal)}>
            <div className={styledModal}>
                <p className={styledModalName}>Add Budget</p>
                <CustomInputText
                    labelText="Budget Name"
                    inputName="budgetName"
                    placeholderText="Budget Name"
                    value={budgetName}
                    onChangeHandler={handleSetBudgetName}
                />

                <CustomInputText
                    labelText="Planned"
                    inputName="planned"
                    placeholderText="0"
                    value={planned}
                    onChangeHandler={handleSetPlanned}
                />

                <div className={styledDates}>
                    <CustomDatePicker
                        labelText="Start Date"
                        selectedDate={startDate}
                        onChangeHandler={handleSetStartDate}
                        customClassName={smallerInput}
                        isDisabled={loading}
                    />
                    <CustomDatePicker
                        labelText="End Date"
                        selectedDate={endDate}
                        onChangeHandler={handleSetEndDate}
                        customClassName={smallerInput}
                        isDisabled={loading}
                        minDate={startDate}
                    />
                </div>

                <CustomMultiSelect
                    labelText="Categories"
                    name="categories"
                    handleChange={handleChange}
                    options={categories}
                />

                <CustomButton
                    buttonText="Add Budget"
                    buttonType="submit"
                    onClickHandler={handleAddBudget}
                    isDisabled={loading}
                    loading={loading}
                />
                <CustomButton
                    buttonText="Cancel"
                    onClickHandler={() => handleModalClose(false)}
                    isDisabled={loading}
                    loading={loading}
                    inverseColor={true}
                />
            </div>
        </div>
    )
}
