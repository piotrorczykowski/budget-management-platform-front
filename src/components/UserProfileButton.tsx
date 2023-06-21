import { css } from '@emotion/css'

const styledSettingsButton = css`
    background-color: #ffffff;
    padding: 0.5em;
    font-weight: 600;
    font-size: 16px;
    width: 100%;
    border: none;

    &:hover {
        background-color: #f0f0f080;
    }
`

export default function UserProfileButton({
    buttonText,
    onClickHandler,
}: {
    buttonText: string
    onClickHandler: () => void
}) {
    return (
        <button className={styledSettingsButton} onClick={onClickHandler}>
            {buttonText}
        </button>
    )
}
