import { css } from '@emotion/css'

const styledButton = css`
    padding: 10px;
    margin-right: 2em;
    font-weight: 600;
    font-size: 14px;
    background-color: #000000;
    color: #f0f0f0;

    border-radius: 2px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);

    &:hover {
        box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
    }
`

export default function TopBarButton({
    buttonText,
    onClickHandler,
}: {
    buttonText: string
    onClickHandler: () => void
}) {
    return (
        <button className={styledButton} onClick={onClickHandler}>
            {buttonText}
        </button>
    )
}
