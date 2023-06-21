import { css } from '@emotion/css'

const styledAlignCenterWrapper = (paddingTop: string | undefined) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: ${paddingTop};
    ${!paddingTop ? 'height: 100%;' : ''}
`

export default function AlignCenterWrapper({
    children,
    paddingTop,
}: {
    children: JSX.Element[] | JSX.Element
    paddingTop?: string
}) {
    return (
        <div className={styledAlignCenterWrapper(paddingTop)}>{children}</div>
    )
}
