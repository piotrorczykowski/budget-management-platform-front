import { css } from '@emotion/css'
import _ from 'lodash'
import { useLayoutEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { getCurrencySymbol } from '../../utils/otherUtils'
import { Currency } from '../../types/enums'
import { BsFillSquareFill } from 'react-icons/bs'
import { PieChartEntryType } from './types'
import { clearAllToasts, showErrorToast } from '../../utils/toastUtils'
import { AxiosResponse } from 'axios'
import { sendGet } from '../../api/axios'
import { ENDPOINTS } from '../../api'
import moment from 'moment'
import { Colors, Initial_Pie_Chart_Entry } from './types/constants'

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
    height: 50%;
    margin-top: 2em;
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
    margin-bottom: 1em;
`

const styledIcon = (color: string) => css`
    margin-right: 1em;
    color: ${color};
`

const legendEntryInfo = css`
    width: 100%;
    display: flex;
    flex-direction: row;
    font-weight: 500;
    font-size: 18px;
    justify-content: space-between;
`

const infoMessage = css`
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    color: #bebfbf;
`

export function ExpensesPieChart({ date }: { date: Date }) {
    const [pieChartData, setPieChartData] = useState([Initial_Pie_Chart_Entry])
    const [expensesSum, setExpensesSum] = useState(0)

    const currency: Currency = localStorage.getItem('currency') as Currency
    const currencySymbol: string = getCurrencySymbol(currency)

    const [labelText, setLabelText] = useState(`All Categories`)
    const [labelValue, setLabelValue] = useState('')

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

    useLayoutEffect(() => {
        const fetchExpensesStructure = async (date: Date) => {
            clearAllToasts()

            try {
                const userId: number = localStorage.getItem(
                    'userId'
                ) as unknown as number
                const timestamp: number = moment(date).unix()

                const res: AxiosResponse = await sendGet(
                    ENDPOINTS.fetchExpensesStructure(userId, timestamp)
                )

                return res.data
            } catch (e: any) {
                showErrorToast(e?.response?.data?.Error)
            }
        }

        fetchExpensesStructure(date).then((data: any[]) => {
            const formattedPieChartData: PieChartEntryType[] = []
            data?.forEach((element, index) => {
                formattedPieChartData.push({
                    ...element,
                    color: Colors[index],
                })
            })

            setPieChartData(formattedPieChartData)

            const expensesSum: number = _.sumBy(
                formattedPieChartData,
                (expense) => expense.value
            )
            setExpensesSum(expensesSum)
            setLabelText('All Categories')
            setLabelValue(`${currencySymbol}${expensesSum.toFixed(2)}`)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    return (
        <div className={styledExpensesPieChartWrapper}>
            <p className={styledHeader}>Expenses Structure</p>

            <PieChart
                style={{ height: '30vh' }}
                lineWidth={30}
                totalValue={0}
                background="#e0e0de"
                label={() => (
                    <text
                        x={50}
                        y={50}
                        dominantBaseline="central"
                        textAnchor="middle"
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
                {pieChartData?.map((pieChartEntry, index) => {
                    return (
                        <div key={index} className={legendEntry}>
                            <BsFillSquareFill
                                size={18}
                                className={styledIcon(pieChartEntry.color)}
                            />
                            <div className={legendEntryInfo}>
                                <p>{pieChartEntry.title}</p>
                                <p>{currencySymbol + pieChartEntry.value}</p>
                            </div>
                        </div>
                    )
                })}
                {!pieChartData.length && (
                    <p className={infoMessage}>
                        There are no data in the selected time interval
                    </p>
                )}
            </div>
        </div>
    )
}
