import { css } from '@emotion/css'
import { ButtonHTMLAttributes } from 'react'

const styledButton = (isDisabled: boolean) => css`
    background-color: #040605;
    color: #f0f0f0;
    font-size: 30px;
    font-weight: 600;
    padding: 10px;
    margin-top: 40px;
    width: 25vw;
    border-radius: 5px;

    &:disabled {
        ${isDisabled ? 'background-color: #04060580;' : ''}
    }
`

export default function CustomButton({
    buttonText,
    loading = false,
    buttonType = 'button',
    onClickHandler,
    isDisabled = false,
}: {
    buttonText: string
    loading?: boolean
    buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    onClickHandler?: () => void
    isDisabled?: boolean
}) {
    console.log(isDisabled)
    return (
        <button
            className={styledButton(isDisabled)}
            disabled={loading || isDisabled}
            type={buttonType}
            onClick={onClickHandler}
        >
            {buttonText}
        </button>
    )
}
