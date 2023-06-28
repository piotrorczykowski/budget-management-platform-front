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
    height: 55%;
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
}: {
    showModal: any
    accountName: string
    accountBalance: string
    isLoading: boolean
    onNameChangeHandler: (accountName: string) => void
    onBalanceChangeHandler: (accountBalance: string) => void
    onClickHandler: () => {}
    handleModalClose: () => void
}) {
    return (
        <div className={accountFormWrapper(showModal)}>
            <div className={styledModal}>
                <p className={styledModalName}>Add Account</p>
                <CustomInputText
                    labelText="Account Name"
                    inputName="accountName"
                    placeholderText="Account Name"
                    value={accountName}
                    onChangeHandler={onNameChangeHandler}
                />
                <CustomInputText
                    labelText="Initial Balance"
                    inputName="accountBalance"
                    placeholderText="0"
                    value={accountBalance}
                    onChangeHandler={onBalanceChangeHandler}
                    inputType="number"
                />
                <CustomButton
                    buttonText="Add Account"
                    onClickHandler={onClickHandler}
                    isDisabled={isLoading}
                />
                <CustomButton
                    buttonText="Cancel"
                    onClickHandler={handleModalClose}
                    isDisabled={isLoading}
                    inverseColor={true}
                />
            </div>
        </div>
    )
}
