import { css } from '@emotion/css'
import CustomButton from '../CustomButton'
import CustomInputText from '../CustomInputText'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CustomDatePicker from '../CustomDatePicker'
import CustomSelect from '../CustomSelect'
import { Category, RecordType, UtilsCategory } from '../../types/enums'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../../utils/toastUtils'
import { AxiosResponse } from 'axios'
import { sendGet, sendPost, sendPut } from '../../api/axios'
import { ENDPOINTS } from '../../api'
import CustomHorizontalRadio from '../customHorizontalRadio/CustomHorizontalRadio'
import moment from 'moment'
import { RecordFormErrorsType } from './types'
import { InitialValues } from './types/constant'
import { BasicApiObject } from '../../types'
import { DefaultAccountName } from '../../types/constants'

const accountFormWrapper = (showModal: boolean) => css`
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
    min-height: 85%;
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

const alignTextRight = css`
    & > input {
        text-align: right;
    }
`

const smallerInput = css`
    width: 12vw;
`

const styledCategoryAndDate = css`
    width: 25vw;
    display: flex;
    justify-content: space-between;
`

const classWithMargin = css`
    margin-top: 30px;
`

const smallerInputWithMargin = css`
    width: 12vw;
    margin-top: 30px;
`

export default function RecordForm({
    id,
    recordType,
    category,
    amount,
    date,
    description,
    account,
    toAccount,
    handleSetRecordType,
    handleSetCategory,
    handleSetAmount,
    handleSetDate,
    handleSetDescription,
    handleSetAccount,
    handleSetToAccount,
    handleModalClose,
    showModal,
    isRecordUpdating = false,
    showRecordType = true,
}: {
    id: number
    recordType: RecordType
    category: BasicApiObject
    amount: string
    date: Date
    description: string
    account: BasicApiObject
    toAccount: BasicApiObject
    showModal: boolean
    handleSetRecordType: (recordType: RecordType) => void
    handleSetCategory: (category: BasicApiObject) => void
    handleSetAmount: (amount: string) => void
    handleSetDate: (date: Date) => void
    handleSetDescription: (description: string) => void
    handleSetAccount: (account: BasicApiObject) => void
    handleSetToAccount: (toAccount: BasicApiObject) => void
    handleModalClose: (shouldRefresh: boolean) => void
    isRecordUpdating?: boolean
    showRecordType?: boolean
}) {
    const categories: BasicApiObject[] = Object.values(Category).map(
        (category, index) => {
            return { id: index, name: category }
        }
    )

    const [formErrors, setFormErrors] = useState({ ...InitialValues })
    const [accounts, setAccounts] = useState([{ id: -1, name: '-' }])

    const [loading, setLoading] = useState(false)

    const isTransfer: boolean = recordType === RecordType.Transfer
    const isExpense: boolean = recordType === RecordType.Expense

    const isValueNegative: boolean =
        recordType === RecordType.Expense ? true : false

    const dataFetchedRef = useRef(false)

    const fetchUserAccounts = async () => {
        setLoading(true)
        clearAllToasts()

        try {
            const userId: number = localStorage.getItem(
                'userId'
            ) as unknown as number

            const res: AxiosResponse = await sendGet(
                ENDPOINTS.fetchUserAccounts(userId)
            )
            setLoading(false)

            return res.data
        } catch (e: any) {
            showErrorToast(e?.response?.data?.Error)
            setLoading(false)
        }
    }

    useLayoutEffect(() => {
        if (dataFetchedRef.current) return
        dataFetchedRef.current = true

        fetchUserAccounts().then((data: any) => {
            if (!data?.length) {
                showErrorToast('No Accounts Found!')
                return
            }

            const accounts: {
                id: number
                name: string
                isDisabled: boolean
            }[] = data?.map((account: any) => {
                return { id: account.id, name: account.name }
            })
            accounts.push({ id: 0, name: DefaultAccountName, isDisabled: true })
            setAccounts(accounts)

            if (!isRecordUpdating) {
                handleSetAccount(accounts[0])
                handleSetToAccount(accounts[1] || accounts[0])
            }

            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const validate = () => {
        const errors: RecordFormErrorsType = { ...InitialValues }

        if (moment().isBefore(date, 'days')) {
            errors.date = 'Payment date cannot be in future'
        }

        if (Number(amount) <= 0) {
            errors.amount = 'Amount cannot be less than or equal to zero'
        }

        if (isTransfer && account.id === toAccount.id) {
            errors.account = 'From Account and To account cannot be the same'
        }

        if (!account.id || (!toAccount.id && isTransfer)) {
            errors.account = 'Please select any other account'
        }

        return errors
    }

    useEffect(() => {
        const isFormValid: boolean = Object.values(formErrors).every(
            (errorMessage: string) => !errorMessage.length
        )

        if (!isFormValid) {
            const errors: RecordFormErrorsType = validate()
            setFormErrors(errors)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, amount, account, toAccount])

    const handleUpsertRecord = async () => {
        setLoading(true)
        clearAllToasts()
        setFormErrors(InitialValues)

        const errors: {
            date: string
            amount: string
            account: string
        } = validate()
        setFormErrors(errors)

        const isFormValid: boolean = Object.values(errors).every(
            (errorMessage: string) => !errorMessage.length
        )

        if (!isFormValid) {
            setLoading(false)
            return
        }

        try {
            const categoryName: string = isExpense
                ? category.name
                : isTransfer
                ? UtilsCategory.Transfer
                : UtilsCategory.Income

            if (isRecordUpdating) {
                await sendPut(ENDPOINTS.updateRecord(id), {
                    recordType,
                    accountId: account.id,
                    amount,
                    date,
                    category: categoryName,
                    toAccountId: toAccount.id,
                    description,
                })

                setLoading(false)
                showSuccessToast('Successfully updated record!')
            } else {
                await sendPost(ENDPOINTS.createRecord, {
                    recordType,
                    accountId: account.id,
                    amount,
                    date,
                    category: categoryName,
                    toAccountId: toAccount.id,
                    description,
                })

                setLoading(false)
                showSuccessToast('Successfully added record!')
            }

            handleModalClose(true)
        } catch (e: any) {
            setLoading(false)
            showErrorToast(e?.response?.data?.Error)
        }
    }

    const handleAmountChange = (value: string) => {
        const regex: RegExp = /[^0-9.]/g
        const transformedAmount: string = value.replace(regex, '')
        handleSetAmount(transformedAmount)
    }

    return (
        <div className={accountFormWrapper(showModal)}>
            <div className={styledModal}>
                <p className={styledModalName}>
                    {isRecordUpdating ? 'Update Record' : 'Add Record'}
                </p>

                {showRecordType && (
                    <CustomHorizontalRadio
                        selectedValue={recordType}
                        onChangeHandler={(e) =>
                            handleSetRecordType(e.target.value)
                        }
                    />
                )}
                <CustomSelect
                    labelText={isTransfer ? 'From Account' : 'Account'}
                    selectName="account"
                    selected={account}
                    options={accounts}
                    onChangeHandler={handleSetAccount}
                    isDisabled={loading}
                    errorMessage={formErrors.account}
                    customClassName={classWithMargin}
                />
                {isTransfer && (
                    <CustomSelect
                        labelText="To Account"
                        selectName="toAccount"
                        selected={toAccount}
                        options={accounts}
                        onChangeHandler={handleSetToAccount}
                        isDisabled={loading}
                        errorMessage={formErrors.account}
                        customClassName={classWithMargin}
                    />
                )}

                <CustomInputText
                    labelText="Amount"
                    inputName="amount"
                    placeholderText="0"
                    value={amount}
                    onChangeHandler={handleAmountChange}
                    customClassName={alignTextRight}
                    showNumberSign={!isTransfer}
                    isNegative={isValueNegative}
                    errorMessage={formErrors.amount}
                    isDisabled={loading}
                />

                {isExpense && (
                    <div className={styledCategoryAndDate}>
                        <CustomSelect
                            labelText="Category"
                            selectName="category"
                            selected={category}
                            options={categories}
                            onChangeHandler={handleSetCategory}
                            isDisabled={loading}
                            customClassName={smallerInputWithMargin}
                            // workaround for having the same height as CustomDatePicker
                            errorMessage={formErrors.date}
                            shouldHideMessage={true}
                        />
                        <CustomDatePicker
                            labelText="Date"
                            selectedDate={date}
                            onChangeHandler={handleSetDate}
                            customClassName={smallerInput}
                            errorMessage={formErrors.date}
                            isDisabled={loading}
                        />
                    </div>
                )}

                {!isExpense && (
                    <CustomDatePicker
                        labelText="Date"
                        selectedDate={date}
                        onChangeHandler={handleSetDate}
                        errorMessage={formErrors.date}
                        isDisabled={loading}
                    />
                )}

                {!isTransfer && (
                    <CustomInputText
                        labelText="Description"
                        inputName="description"
                        placeholderText=""
                        value={description}
                        onChangeHandler={handleSetDescription}
                        isDisabled={loading}
                    />
                )}

                <CustomButton
                    buttonText={
                        isRecordUpdating ? 'Update Record' : 'Add Record'
                    }
                    onClickHandler={handleUpsertRecord}
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
