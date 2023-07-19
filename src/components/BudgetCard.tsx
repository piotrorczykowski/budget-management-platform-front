import { css } from '@emotion/css'
import BudgetProgressBar from './BudgetProgressBar'
import moment from 'moment'
import { Currency } from '../types/enums'
import { getCurrencySymbol } from '../utils/otherUtils'
import OutsideClickHandler from 'react-outside-click-handler'
import { HiDotsVertical } from 'react-icons/hi'
import MenuButton from './MenuButton'
import { useState } from 'react'

const styledBudgetWrapper = css`
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #ffffff;

    font-weight: 500;
    margin-bottom: 2em;
    cursor: pointer;
    border-radius: 2px;

    background-color: #ffffff;
    padding: 1em;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: #f0f0f0;
        border-bottom: 2px solid #62656980;
    }
`

const styledMainBudgetSection = css`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const styledCenterBudgetCardSection = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const styledBudgetName = css`
    font-size: 25px;
    font-weight: 600;
`

const styledLeftPercentages = css`
    font-size: 18px;
    font-weight: 600;
    background-color: #e6e6e6;
    padding: 0.1em 0.5em 0.1em 0.5em;
    border: 2px solid #e6e6e6;
    border-radius: 2px;
`

const styledDates = css`
    font-weight: 600;
    color: #777b86;
    font-size: 14px;
`

const styledBudgetProgressBar = css`
    width: 100%;
    height: 20px;
    padding: 0.5em 0 0.5em 0;
`

const styledBottomBudgetCardSection = css`
    display: flex;
    justify-content: space-between;
    margin-top: 0.5em;
`

const styledSpentAndPlanned = css`
    color: #777b86;
    line-height: 100%;
`

const styledRemains = css`
    line-height: 100%;
`

const styledCategoriesSection = css`
    margin-top: 1em;
    display: flex;
    column-gap: 15px;
`

const styledCategory = css`
    display: block;
    background-color: #e6e6e6;

    border: 2px solid #e6e6e6;
    border-radius: 2px;
    padding: 0.2em 0.4em 0.2em 0.4em;
    font-weight: 600;
`

const styledMenuSection = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 5%;
    text-align: right;
    position: relative;
    margin-left: auto;
`

const styledIcon = css`
    font-size: 22px;
    color: #626569;

    &:hover {
        color: black;
    }
`

const styledMenu = css`
    background-color: #ffffff;
    padding: 0.5em;
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 30%;
    margin-right: -10px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 999;
`

export default function BudgetCard({
    id,
    name,
    planned,
    spent,
    startDate,
    endDate,
    categories,
    handleBudgetEdit,
    handleBudgetDelete,
}: {
    id: number
    name: string
    planned: number
    spent: number
    startDate: Date
    endDate: Date
    categories: string[]
    handleBudgetEdit: (budgetId: number) => void
    handleBudgetDelete: (budgetId: number) => void
}) {
    const [showMenu, setShowMenu] = useState(false)

    const remains: number = planned - spent
    const leftPercentages: number = (remains / planned) * 100

    const currency: Currency = localStorage.getItem('currency') as Currency

    const formattedRemains: string =
        remains < 0
            ? `-${getCurrencySymbol(currency)}${(-1 * remains).toFixed(2)}`
            : `${getCurrencySymbol(currency)}${remains.toFixed(2)}`
    const formattedLeftPercentages: string =
        leftPercentages > 100
            ? `-${(leftPercentages - 100).toFixed(0)}%`
            : `${leftPercentages.toFixed(0)}%`

    return (
        <div
            className={styledBudgetWrapper}
            onClick={() => handleBudgetEdit(id)}
        >
            <div className={styledMainBudgetSection}>
                <p className={styledDates}>
                    {moment(startDate).format('D MMM') +
                        ' - ' +
                        moment(endDate).format('D MMM')}
                </p>

                <div className={styledCenterBudgetCardSection}>
                    <p className={styledBudgetName}>{name}</p>
                    <p className={styledLeftPercentages}>
                        {formattedLeftPercentages}
                    </p>
                </div>

                <div className={styledBudgetProgressBar}>
                    <BudgetProgressBar completed={leftPercentages} />
                </div>

                <div className={styledBottomBudgetCardSection}>
                    <p className={styledSpentAndPlanned}>
                        {getCurrencySymbol(currency)}
                        {spent} <br />
                        Spent
                    </p>

                    <p className={styledSpentAndPlanned}>
                        {getCurrencySymbol(currency)}
                        {planned} <br />
                        Planned
                    </p>

                    <p className={styledRemains}>
                        {formattedRemains} <br />
                        Remains
                    </p>
                </div>

                <div className={styledCategoriesSection}>
                    {categories?.map((category, index) => {
                        return (
                            <p key={index} className={styledCategory}>
                                {category}
                            </p>
                        )
                    })}
                    <div className={styledMenuSection}>
                        <OutsideClickHandler
                            onOutsideClick={() => {
                                setShowMenu(false)
                            }}
                        >
                            <HiDotsVertical
                                className={styledIcon}
                                onClick={(e) => setShowMenu(true)}
                            />
                            {showMenu && (
                                <div className={styledMenu}>
                                    <MenuButton
                                        buttonText="Edit"
                                        onClickHandler={() =>
                                            handleBudgetEdit(id)
                                        }
                                    />
                                    <MenuButton
                                        buttonText="Delete"
                                        onClickHandler={() =>
                                            handleBudgetDelete(id)
                                        }
                                    />
                                </div>
                            )}
                        </OutsideClickHandler>
                    </div>
                </div>
            </div>
        </div>
    )
}
