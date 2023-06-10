import { css } from '@emotion/css'

const styledMainMessage = css`
    font-size: 40px;
    font-weight: 600;
    margin: 20px 0 0 0;
    text-align: center;
`

const styledSecondMessage = css`
    font-size: 20px;
    font-weight: 500;
    margin: 10px 0 0 0;
    text-align: center;
`

export default function CustomWelcomeMessage({
    mainText,
    otherText,
}: {
    mainText: string
    otherText: string
}) {
    return (
        <div>
            <p className={styledMainMessage}>{mainText}</p>
            <p className={styledSecondMessage}>{otherText}</p>
        </div>
    )
}
