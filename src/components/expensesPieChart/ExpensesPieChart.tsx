import { css } from '@emotion/css'
import _ from 'lodash'
import { useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { getCurrencySymbol } from '../../utils/otherUtils'
import { Currency } from '../../types/enums'
import { BsFillSquareFill } from 'react-icons/bs'
import { PieChartEntryType } from './types'

const styledExpensesPieChartWrapper = css`
    background-color: #ffffff;
    margin: 1em;
    padding: 1em;
    border-radius: 2px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
    height: 85%;
`

const styledHeader = css`
    font-weight: 600;
    padding-bottom: 1em;
    margin-bottom: 2em;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2);
    font-size: 18px;
`

const styledLegend = css`
    margin-top: 1em;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`

const legendEntry = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`

export function ExpensesPieChart() {
    const pieChartData: PieChartEntryType[] = [
        { title: 'One', value: 10, color: '#E38627' },
        { title: 'Two', value: 35, color: '#C13C37' },
        { title: 'Three', value: 20, color: '#6A2135' },
        { title: 'Four', value: 200, color: '#6D8135' },
    ]

    const currency: Currency = localStorage.getItem('currency') as Currency
    const currencySymbol: string = getCurrencySymbol(currency)
    const expensesSum: number = _.sumBy(
        pieChartData,
        (expense) => expense.value
    )

    const [labelText, setLabelText] = useState(`All Categories`)
    const [labelValue, setLabelValue] = useState(
        `${currencySymbol}${expensesSum.toFixed(2)}`
    )

    const handleMouseOver = (index: number) => {
        const expense: any = pieChartData[index]

        if (expense) {
            setLabelText(expense.title)
            setLabelValue(`${currencySymbol}${expense.value.toFixed(2)}`)
        } else {
            setLabelText('All Categories')
            setLabelValue(`${currencySymbol}${expensesSum.toFixed(2)}`)
        }
    }

    return (
        <div className={styledExpensesPieChartWrapper}>
            <p className={styledHeader}>Expenses Structure</p>

            <PieChart
                style={{ height: '30vh' }}
                lineWidth={30}
                label={() => (
                    <text
                        x={50}
                        y={50}
                        dominant-baseline="central"
                        text-anchor="middle"
                        style={{
                            fontSize: '8px',
                            fontWeight: 500,
                        }}
                    >
                        <tspan x={50} y={45}>
                            {labelText}
                        </tspan>
                        <tspan x={50} y={55}>
                            {labelValue}
                        </tspan>
                    </text>
                )}
                labelPosition={0}
                onMouseOver={(_, index) => {
                    handleMouseOver(index)
                }}
                onMouseOut={() => {
                    handleMouseOver(-1)
                }}
                data={pieChartData}
            />

            <div className={styledLegend}>
                <div className={legendEntry}>
                    <BsFillSquareFill /> <p>Test</p>
                </div>
            </div>
        </div>
    )
}
