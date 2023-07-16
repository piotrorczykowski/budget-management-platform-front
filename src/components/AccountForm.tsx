import { css } from '@emotion/css'
import CustomButton from './CustomButton'
import CustomInputText from './CustomInputText'

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
    min-height: 55%;
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

export default function AccountForm({
    showModal,
    accountName,
    accountBalance,
    isLoading,
    onNameChangeHandler,
    onBalanceChangeHandler,
    onClickHandler,
    handleModalClose,
    errorMessages,
    isAccountUpdating = false,
}: {
    showModal: any
    accountName: string
    accountBalance: string
    isLoading: boolean
    onNameChangeHandler: (accountName: string) => void
    onBalanceChangeHandler: (accountBalance: string) => void
    onClickHandler: () => {}
    handleModalClose: () => void
    errorMessages: { accountName: string; accountBalance: string }
    isAccountUpdating?: boolean
}) {
    return (
        <div className={accountFormWrapper(showModal)}>
            <div className={styledModal}>
                <p className={styledModalName}>
                    {isAccountUpdating ? 'Update' : 'Add'} Account
                </p>
                <CustomInputText
                    labelText="Account Name"
                    inputName="accountName"
                    placeholderText="Account Name"
                    value={accountName}
                    onChangeHandler={onNameChangeHandler}
                    errorMessage={errorMessages.accountName}
                />
                <CustomInputText
                    labelText={
                        isAccountUpdating
                            ? 'Current Balance'
                            : 'Initial Balance'
                    }
                    inputName="accountBalance"
                    placeholderText="0"
                    value={accountBalance}
                    onChangeHandler={onBalanceChangeHandler}
                    errorMessage={errorMessages.accountBalance}
                />
                <CustomButton
                    buttonText={
                        isAccountUpdating ? 'Update Account' : 'Add Account'
                    }
                    buttonType="submit"
                    onClickHandler={onClickHandler}
                    isDisabled={isLoading}
                    loading={isLoading}
                />
                <CustomButton
                    buttonText="Cancel"
                    onClickHandler={handleModalClose}
                    isDisabled={isLoading}
                    loading={isLoading}
                    inverseColor={true}
                />
            </div>
        </div>
    )
}
