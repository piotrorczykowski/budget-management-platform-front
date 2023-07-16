import { css } from '@emotion/css'
import CustomButton from '../CustomButton'
import CustomInputText from '../CustomInputText'
import { useState } from 'react'
import CustomDatePicker from '../CustomDatePicker'
import CustomMultiSelect from '../CustomMultiSelect'
import { Category } from '../../types/enums'
import { FormErrorsType, SelectOptionType } from './types'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../../utils/toastUtils'
import { sendPost } from '../../api/axios'
import { ENDPOINTS } from '../../api'
import { InitialValues } from './types/constants'
import moment from 'moment'

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
    min-height: 80%;
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

    const [formErrors, setFormErrors] = useState({ ...InitialValues })

    const [loading, setLoading] = useState(false)

    const handleChange = (selectedOption: SelectOptionType[]) => {
        handleSetSelectedCategories(selectedOption)
    }

    const validate = () => {
        const errors: FormErrorsType = { ...InitialValues }

        if (!budgetName.length) {
            errors.budgetName = 'Budget name cannot be empty'
        }

        if (Number(planned) <= 0) {
            errors.planned = 'Planned cannot be equal or less than zero'
        }

        if (moment(startDate).isSame(endDate)) {
            errors.dates = 'Dates cannot be the same'
        }

        const areSelectedCategoriesValid: boolean = !selectedCategories.every(
            (selectedCategory) => selectedCategory.value.length > 0
        )
        if (areSelectedCategoriesValid) {
            errors.categories = 'You have to select at least one category'
        }

        return errors
    }

    const handleAddBudget = async () => {
        setLoading(true)
        clearAllToasts()

        const errors: FormErrorsType = validate()
        setFormErrors(errors)

        const isFormValid: boolean = Object.values(errors).every(
            (errorMessage: string) => !errorMessage.length
        )

        if (!isFormValid) {
            setLoading(false)
            return
        }

        try {
            const formattedCategories: string[] = selectedCategories.map(
                (selectedCategory) => selectedCategory.value
            )
            await sendPost(ENDPOINTS.createBudget, {
                name: budgetName,
                planned,
                startDate,
                endDate,
                categories: formattedCategories,
            })

            setLoading(false)
            showSuccessToast('Successfully added budget!')
            handleModalClose(true)
        } catch (e: any) {
            setLoading(false)
            showErrorToast(e?.response?.data?.Error)
        }
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
                    errorMessage={formErrors.budgetName}
                />

                <CustomInputText
                    labelText="Planned"
                    inputName="planned"
                    placeholderText="0"
                    value={planned}
                    onChangeHandler={handleSetPlanned}
                    errorMessage={formErrors.planned}
                />

                <div className={styledDates}>
                    <CustomDatePicker
                        labelText="Start Date"
                        selectedDate={startDate}
                        onChangeHandler={handleSetStartDate}
                        customClassName={smallerInput}
                        isDisabled={loading}
                        errorMessage={formErrors.dates}
                    />
                    <CustomDatePicker
                        labelText="End Date"
                        selectedDate={endDate}
                        onChangeHandler={handleSetEndDate}
                        customClassName={smallerInput}
                        isDisabled={loading}
                        minDate={startDate}
                        errorMessage={formErrors.dates}
                    />
                </div>

                <CustomMultiSelect
                    labelText="Categories"
                    name="categories"
                    handleChange={handleChange}
                    options={categories}
                    errorMessage={formErrors.categories}
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
