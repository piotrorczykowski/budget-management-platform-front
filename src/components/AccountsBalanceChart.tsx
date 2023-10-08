import { css } from '@emotion/css'
import { useLayoutEffect, useState } from 'react'
import Chart from 'react-google-charts'
import { clearAllToasts, showErrorToast } from '../utils/toastUtils'
import moment from 'moment'
import { AxiosResponse } from 'axios'
import { sendGet } from '../api/axios'
import { ENDPOINTS } from '../api'

const styledAccountsBalanceChartWrapper = css`
    background-color: #ffffff;
    margin: 1em;
    padding: 1em;
    border-radius: 2px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
`

const styledHeader = css`
    font-weight: 600;
    padding-bottom: 1em;
    margin-bottom: 0.1em;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2);
    font-size: 18px;
`

export default function AccountsBalanceChart({ date }: { date: Date }) {
    const [chartData, setChartData] = useState<any[] | undefined>([])

    const LineChartOptions = {
        hAxis: {
            title: 'Day',
        },
        vAxis: {
            title: 'Balance',
        },
        legend: 'none',
        lineWidth: 4,
    }

    useLayoutEffect(() => {
        const fetchAccountsBalance = async (date: Date) => {
            clearAllToasts()
            try {
                const userId: number = localStorage.getItem(
                    'userId'
                ) as unknown as number
                const timestamp: number = moment(date).unix()

                const res: AxiosResponse = await sendGet(
                    ENDPOINTS.fetchAccountsBalance(userId, timestamp)
                )

                return res.data
            } catch (e: any) {
                showErrorToast(e?.response?.data?.Error)
            }
        }

        fetchAccountsBalance(date).then((data: any[]) => {
            const formattedData: any[] = data?.map((val: [string, number]) => [
                moment(val[0]).format('DD'),
                val[1],
            ])
            formattedData?.unshift(['Day', 'Balance'])

            if (formattedData.length === 1) {
                formattedData?.push(['0', 0])
            }

            setChartData(formattedData)
        })
    }, [date])

    return (
        <div className={styledAccountsBalanceChartWrapper}>
            <p className={styledHeader}>Accounts Balance</p>

            <div>
                <Chart
                    width="100%"
                    height="46vh"
                    chartType="LineChart"
                    data={chartData}
                    options={LineChartOptions}
                />
            </div>
        </div>
    )
}
