import { css } from '@emotion/css'
import { useLayoutEffect, useRef, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import TopBar from '../../components/TopBar'
import CustomInputText from '../../components/CustomInputText'
import CustomButton from '../../components/CustomButton'
import CustomSelect from '../../components/CustomSelect'
import { Currency } from '../../types/enums'
import {
    clearAllToasts,
    showErrorToast,
    showSuccessToast,
} from '../../utils/toastUtils'
import { sendGet, sendPut } from '../../api/axios'
import { ENDPOINTS } from '../../api'
import { FormInputsType } from './types'
import { InitialValues } from './types/constants'
import { AxiosResponse } from 'axios'

const styledSettingsPageWrapper = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const styledIcon = css`
    align-self: center;
    margin-top: 4vh;
`

const styledProfileForm = css`
    padding: 0em 5em 0em 5em;
`

const styledRow = css`
    display: flex;
    justify-content: space-around;
`

const styledButtons = css`
    padding: 0em 5em 0em 5em;
    display: flex;
    justify-content: space-around;
    margin-top: auto;
    margin-bottom: auto;
`

export default function SettingsPage() {
    const currencies: { id: number; name: string }[] = Object.keys(
        Currency
    ).map((currency, index) => {
        return { id: index, name: currency }
    })

    const [userId, setUserId] = useState(0)

    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [currency, setCurrency] = useState(currencies[0])

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [editingData, setEditingData] = useState(false)

    const [formErrors, setFormErrors] = useState(InitialValues)

    const validate = async (): Promise<FormInputsType> => {
        const errors: FormInputsType = { ...InitialValues }

        if (!username) {
            errors.fullName = 'Username is required!'
        }

        if (!fullName) {
            errors.fullName = 'Full Name is required!'
        }

        if (!email) {
            errors.fullName = 'Email is required!'
        }

        if (username.length < 5) {
            errors.username = 'Username must be more than 5 characters'
        }

        if (fullName.length < 5) {
            errors.fullName = 'Full Name must be more than 5 characters'
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        if (!regex.test(email) && !!email.length) {
            errors.email = 'This is not a valid email format!'
        }

        if (
            (currentPassword || newPassword) &&
            currentPassword !== newPassword
        ) {
            errors.currentPassword =
                'Current Password and New Password must be same'
            errors.newPassword =
                'Current Password and New Password must be same'
        }

        return errors
    }

    const handleSubmit = async () => {
        if (!editingData) {
            setEditingData(true)
            return
        }
        setFormErrors(InitialValues)
        setEditingData(false)
        setLoading(true)
        clearAllToasts()

        const errors: FormInputsType = await validate()
        setFormErrors(errors)

        const isFormValid: boolean = Object.values(errors).every(
            (errorMessage) => !errorMessage.length
        )

        if (!isFormValid) {
            setEditingData(true)
            setLoading(false)
            return
        }

        try {
            const res: any = await sendPut(ENDPOINTS.updateUser(userId), {
                username,
                fullName,
                email,
                currency: currency.name,
                password: newPassword,
            })

            showSuccessToast('Profile successfully updated')

            setUsername(res.data?.username)
            setFullName(res.data?.fullName)
            setEmail(res.data?.email)
            setCurrency(res.data?.currency)
            setCurrentPassword('')
            setNewPassword('')

            setLoading(false)
        } catch (e: any) {
            showErrorToast(e?.response?.data?.Error)
            setLoading(false)
        }
    }

    const dataFetchedRef = useRef(false)

    const fetchUserProfile = async () => {
        setLoading(true)
        clearAllToasts()

        try {
            const res: AxiosResponse = await sendGet(ENDPOINTS.fetchProfile)
            return res.data
        } catch (e: any) {
            showErrorToast(e?.response?.data?.Error)
            setLoading(false)
        }
    }

    useLayoutEffect(() => {
        if (dataFetchedRef.current) return
        dataFetchedRef.current = true

        fetchUserProfile().then((data: any) => {
            setUserId(data?.id)
            setUsername(data?.username)
            setFullName(data?.fullName)
            setEmail(data?.email)
            setCurrency(data?.currency)
            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCancelEditing = async () => {
        setCurrentPassword('')
        setNewPassword('')
        setEditingData(false)
        setFormErrors(InitialValues)

        fetchUserProfile().then((data: any) => {
            setUserId(data?.id)
            setUsername(data?.username)
            setFullName(data?.fullName)
            setEmail(data?.email)
            setCurrency(data?.currency)
            setLoading(false)
        })
    }

    return (
        <div className={styledSettingsPageWrapper}>
            <TopBar pageNameText={'Settings'} />

            <div className={styledIcon}>
                <CgProfile size={140} />
            </div>

            <form className={styledProfileForm} autoComplete="off">
                <div className={styledRow}>
                    <CustomInputText
                        labelText="Username"
                        inputName="username"
                        placeholderText=""
                        value={username}
                        onChangeHandler={setUsername}
                        isDisabled={!editingData}
                        errorMessage={formErrors.username}
                    />

                    <CustomInputText
                        labelText="Full Name"
                        inputName="fullname"
                        placeholderText=""
                        value={fullName}
                        onChangeHandler={setFullName}
                        isDisabled={!editingData}
                        errorMessage={formErrors.fullName}
                    />
                </div>

                <div className={styledRow}>
                    <CustomInputText
                        labelText="Email"
                        inputName="email"
                        placeholderText=""
                        value={email}
                        onChangeHandler={setEmail}
                        isDisabled={!editingData}
                        errorMessage={formErrors.email}
                    />

                    <CustomSelect
                        labelText="Currency"
                        selectName="currency"
                        selected={currency}
                        options={currencies}
                        onChangeHandler={setCurrency}
                        isDisabled={!editingData}
                    />
                </div>

                <div className={styledRow}>
                    <CustomInputText
                        labelText="Current Password"
                        inputName="currentPassword"
                        placeholderText=""
                        value={currentPassword}
                        onChangeHandler={setCurrentPassword}
                        inputType="password"
                        isInputTypePassword={true}
                        isDisabled={!editingData}
                        isRequired={false}
                        errorMessage={formErrors.currentPassword}
                    />

                    <CustomInputText
                        labelText="New Password"
                        inputName="newPassword"
                        placeholderText=""
                        value={newPassword}
                        onChangeHandler={setNewPassword}
                        inputType="password"
                        isInputTypePassword={true}
                        isDisabled={!editingData}
                        isRequired={false}
                        errorMessage={formErrors.newPassword}
                    />
                </div>
            </form>

            <div className={styledButtons}>
                <CustomButton
                    buttonText={editingData ? 'Save Changes' : 'Edit Data'}
                    loading={loading}
                    buttonType="submit"
                    onClickHandler={() => handleSubmit()}
                />
                <CustomButton
                    buttonText="Cancel"
                    loading={loading}
                    buttonType="submit"
                    onClickHandler={() => handleCancelEditing()}
                    isDisabled={!editingData}
                    inverseColor={true}
                />
            </div>
        </div>
    )
}
