import { css } from '@emotion/css'
import { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import TopBar from '../components/TopBar'
import CustomInputText from '../components/CustomInputText'
import CustomButton from '../components/CustomButton'
import CustomSelect from '../components/CustomSelect'
import { Currency } from '../types/enums'

const styledSettingsPageWrapper = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const styledIcon = css`
    font-size: 140px;
    align-self: center;
    margin-top: 5vh;
`

const styledProfileForm = css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 150px;
    width: 58vw;
    align-self: center;
    margin-top: 1vh;
`

const styledBreak = css`
    flex-basis: 100%;
    height: 0;
    margin-bottom: 5vh;
`

const styledButtons = css`
    column-gap: 150px;
    display: flex;
    flex-direction: row;
    align-self: center;
    margin-top: auto;
    margin-bottom: 8vh;
`

export default function SettingsPage() {
    // TODO add backend data

    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [currency, setCurrency] = useState('')

    const [loading, setLoading] = useState(false)
    const [editingData, setEditingData] = useState(false)

    const currencies: string[] = Object.keys(Currency)

    return (
        <div className={styledSettingsPageWrapper}>
            <TopBar pageNameText={'Settings'} />

            <CgProfile className={styledIcon} />

            <form className={styledProfileForm} autoComplete="off">
                <CustomInputText
                    labelText="Username"
                    inputName="username"
                    placeholderText="Username"
                    value={username}
                    onChangeHandler={setUsername}
                    isDisabled={!editingData}
                />

                <CustomInputText
                    labelText="Full Name"
                    inputName="fullname"
                    placeholderText="Full Name"
                    value={fullName}
                    onChangeHandler={setFullName}
                    isDisabled={!editingData}
                />

                <CustomInputText
                    labelText="Email"
                    inputName="email"
                    placeholderText="Email"
                    value={email}
                    onChangeHandler={setEmail}
                    isDisabled={!editingData}
                />

                <CustomSelect
                    labelText="Currency"
                    selectName="currency"
                    options={currencies}
                    onChangeHandler={setCurrency}
                    isDisabled={!editingData}
                />

                <div className={styledBreak}></div>

                <CustomInputText
                    labelText="Current Password"
                    inputName="currentPassword"
                    placeholderText="Current Password"
                    value={currentPassword}
                    onChangeHandler={setCurrentPassword}
                    isDisabled={!editingData}
                    isRequired={false}
                />

                <CustomInputText
                    labelText="New Password"
                    inputName="newPassword"
                    placeholderText="New Password"
                    value={newPassword}
                    onChangeHandler={setNewPassword}
                    isDisabled={!editingData}
                    isRequired={false}
                />
            </form>

            <div className={styledButtons}>
                <CustomButton
                    buttonText={editingData ? 'Save Changes' : 'Edit Data'}
                    loading={loading}
                    buttonType="submit"
                    onClickHandler={() => setEditingData(!editingData)}
                />
                <CustomButton
                    buttonText="Cancel"
                    loading={loading}
                    buttonType="submit"
                    onClickHandler={() => setEditingData(false)}
                    isDisabled={!editingData}
                />
            </div>
        </div>
    )
}
