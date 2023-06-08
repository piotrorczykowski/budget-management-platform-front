import { css } from '@emotion/css'
import { ButtonHTMLAttributes } from 'react'

const styledButton = css`
    background-color: #040605;
    color: #f0f0f0;
    font-size: 30px;
    font-weight: 600;
    padding: 10px;
    margin-top: 40px;
    width: 25vw;
    border-radius: 5px;
`

export default function CustomButton({
    buttonText,
    loading = false,
    buttonType = 'button',
    onClickHandler,
}: {
    buttonText: string
    loading?: boolean
    buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    onClickHandler?: () => void
}) {
    return (
        <button
            className={styledButton}
            disabled={loading}
            type={buttonType}
            onClick={onClickHandler}
        >
            {buttonText}
        </button>
    )
}
