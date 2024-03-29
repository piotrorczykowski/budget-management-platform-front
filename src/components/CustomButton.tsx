import { css } from '@emotion/css'
import { ButtonHTMLAttributes } from 'react'

const styledButton = (inverseColor: boolean) => css`
    background-color: ${inverseColor ? '#ffffff' : '#040605'};
    color: ${inverseColor ? '#040605' : '#f0f0f0'};
    font-size: 30px;
    font-weight: 600;
    padding: 10px;
    margin-top: 40px;
    width: 25vw;
    border-radius: 5px;

    &:disabled {
        ${inverseColor
            ? 'background-color: #ffffff80; color: #04060580;'
            : 'background-color: #04060580;'}
    }
`

export default function CustomButton({
    buttonText,
    loading = false,
    buttonType = 'button',
    onClickHandler,
    isDisabled = false,
    inverseColor = false,
}: {
    buttonText: string
    loading?: boolean
    buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    onClickHandler?: () => void
    isDisabled?: boolean
    inverseColor?: boolean
}) {
    return (
        <button
            className={styledButton(inverseColor)}
            disabled={loading || isDisabled}
            type={buttonType}
            onClick={onClickHandler}
        >
            {!loading ? buttonText : 'loading...'}
        </button>
    )
}
