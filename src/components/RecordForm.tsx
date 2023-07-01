import { css } from '@emotion/css'
import CustomButton from './CustomButton'
import CustomInputText from './CustomInputText'
import { useLayoutEffect, useRef, useState } from 'react'
import CustomDatePicker from './CustomDatePicker'
import CustomSelect from './CustomSelect'
import { Category, RecordType } from '../types/enums'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../utils/toastUtils'
import { AxiosResponse } from 'axios'
import api from '../api/axios'
import { ENDPOINTS } from '../api'
import CustomHorizontalRadio from './CustomHorizontalRadio/CustomHorizontalRadio'

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

    const handleAddRecord = async () => {
        setLoading(true)
        clearAllToasts()

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
                />
                {isTransfer && (
                    <CustomSelect
                        labelText="To Account"
                        selectName="toAccount"
                        selected={toAccount}
                        options={accounts}
                        onChangeHandler={setToAccount}
                        isDisabled={loading}
                    />
                )}

                <CustomInputText
                    labelText="Amount"
                    inputName="amount"
                    placeholderText="0"
                    value={amount}
                    onChangeHandler={setAmount}
                    customClassName={alignTextRight}
                    inputType="number"
                    showNumberSign={!isTransfer}
                    isNegative={isValueNegative}
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
                            customClassName={smallerInput}
                        />
                        <CustomDatePicker
                            labelText="Date"
                            selectedDate={date}
                            onChangeHandler={setDate}
                            customClassName={smallerInput}
                        />
                    </div>
                )}

                {isTransfer && (
                    <CustomDatePicker
                        labelText="Date"
                        selectedDate={date}
                        onChangeHandler={setDate}
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
