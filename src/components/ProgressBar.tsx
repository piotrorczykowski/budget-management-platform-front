import { css } from '@emotion/css'
import { ProgressBarColor } from '../types/enums'

const styledProgressBarWrapper = css`
    height: 100%;
    width: 100%;
    background-color: #e0e0de;
    border-radius: 2px;
`

const styledFiller = (
    progress: number,
    progressBarColor: ProgressBarColor
) => css`
    height: 100%;
    ${progress >= 0 && progress <= 100
        ? `width: ${progress}%;`
        : 'width: 100%;'}
    border-radius: inherit;
    background-color: ${progressBarColor};
`

export default function ProgressBar({
    progress,
    progressBarColor,
}: {
    progress: number
    progressBarColor: ProgressBarColor
}) {
    return (
        <div className={styledProgressBarWrapper}>
            <div className={styledFiller(progress, progressBarColor)}></div>
        </div>
    )
}
