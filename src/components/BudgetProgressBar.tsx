import { css } from '@emotion/css'

const styledBudgetProgressBarWrapper = css`
    height: 15px;
    width: 100%;
    background-color: #e0e0de;
    border-radius: 2px;
`

const styledFiller = (completed: number) => css`
    height: 100%;
    ${completed >= 0 ? `width: ${100 - completed}%;` : 'width: 100%;'}
    ${completed >= 0
        ? 'background-color: #1d934b;'
        : 'background-color: #f12e25;'}
    border-radius: inherit;
`

export default function BudgetProgressBar({
    completed,
}: {
    completed: number
}) {
    return (
        <div className={styledBudgetProgressBarWrapper}>
            <div className={styledFiller(completed)}></div>
        </div>
    )
}
