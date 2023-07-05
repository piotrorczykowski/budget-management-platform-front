import { css } from '@emotion/css'
import CustomButton from '../CustomButton'
import CustomInputText from '../CustomInputText'
import { useLayoutEffect, useRef, useState } from 'react'
import CustomDatePicker from '../CustomDatePicker'
import CustomSelect from '../CustomSelect'
import { Category, RecordType } from '../../types/enums'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../../utils/toastUtils'
import { AxiosResponse } from 'axios'
import api from '../../api/axios'
import { ENDPOINTS } from '../../api'
import CustomHorizontalRadio from '../CustomHorizontalRadio/CustomHorizontalRadio'
import moment from 'moment'
import { RecordFormErrorsType } from './types'
import { InitialValues } from './types/constant'

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
    showModal,
    handleModalClose,
}: {
    showModal: boolean
    handleModalClose: (addedRecord: boolean) => void
}) {
    const categories: { id: number; name: string }[] = Object.keys(
        Category
    ).map((category, index) => {
        return { id: index, name: category }
    })

    const [formErrors, setFormErrors] = useState({ ...InitialValues })

    const [recordType, setRecordType] = useState(RecordType.Expense)
    const [category, setCategory] = useState(categories[0])
    const [accounts, setAccounts] = useState([{ id: -1, name: '-' }])
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(new Date())
    const [description, setDescription] = useState('')

    const [account, setAccount] = useState({ id: -1, name: '-' })
    const [toAccount, setToAccount] = useState({ id: -1, name: '-' })

    const [loading, setLoading] = useState(false)

    const isTransfer: boolean = recordType === RecordType.Transfer
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

            const res: AxiosResponse = await api.get(
                ENDPOINTS.fetchUserAccounts(userId)
            )

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

            const accounts: { id: number; name: string }[] = data?.map(
                (account: any) => {
                    return { id: account.id, name: account.name }
                }
            )
            setAccounts(accounts)
            setAccount(accounts[0])
            setToAccount(accounts[1] || accounts[0])
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

        return errors
    }

    const handleAddRecord = async () => {
        setLoading(true)
        clearAllToasts()

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
            await api.post(ENDPOINTS.createRecord, {
                recordType,
                accountId: account.id,
                amount,
                date,
                category: category.name,
                toAccountId: toAccount.id,
                description,
            })

            showSuccessToast('Successfully added record!')
            handleModalClose(true)
        } catch (e: any) {
            showErrorToast(e?.response?.data?.Error)
        }
    }

    const handleAmountChange = (value: string) => {
        const regex: RegExp = /[^0-9.]/g
        const transformedAmount: string = value.replace(regex, '')
        setAmount(transformedAmount)
    }

    return (
        <div className={accountFormWrapper(showModal)}>
            <div className={styledModal}>
                <p className={styledModalName}>Add Record</p>

                <CustomHorizontalRadio
                    selectedValue={recordType}
                    onChangeHandler={(e) => setRecordType(e.target.value)}
                />
                <CustomSelect
                    labelText={isTransfer ? 'From Account' : 'Account'}
                    selectName="account"
                    selected={account}
                    options={accounts}
                    onChangeHandler={setAccount}
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
                        onChangeHandler={setToAccount}
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
                />

                {!isTransfer && (
                    <div className={styledCategoryAndDate}>
                        <CustomSelect
                            labelText="Category"
                            selectName="category"
                            selected={category}
                            options={categories}
                            onChangeHandler={setCategory}
                            isDisabled={loading}
                            customClassName={smallerInputWithMargin}
                            // workaround for having the same height as CustomDatePicker
                            errorMessage={formErrors.date}
                            shouldHideMessage={true}
                        />
                        <CustomDatePicker
                            labelText="Date"
                            selectedDate={date}
                            onChangeHandler={setDate}
                            customClassName={smallerInput}
                            errorMessage={formErrors.date}
                        />
                    </div>
                )}

                {isTransfer && (
                    <CustomDatePicker
                        labelText="Date"
                        selectedDate={date}
                        onChangeHandler={setDate}
                        errorMessage={formErrors.date}
                    />
                )}

                {!isTransfer && (
                    <CustomInputText
                        labelText="Description"
                        inputName="description"
                        placeholderText=""
                        value={description}
                        onChangeHandler={setDescription}
                    />
                )}

                <CustomButton
                    buttonText="Add Record"
                    onClickHandler={handleAddRecord}
                    isDisabled={loading}
                />
                <CustomButton
                    buttonText="Cancel"
                    onClickHandler={() => handleModalClose(false)}
                    isDisabled={loading}
                    inverseColor={true}
                />
            </div>
        </div>
    )
}
