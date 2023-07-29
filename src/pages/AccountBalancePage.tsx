import { useLayoutEffect, useState } from 'react'
import CustomMontAndYearPicker from '../components/CustomMonthAndYearPicker'
import TopBar from '../components/TopBar'
import { css } from '@emotion/css'
import Chart from 'react-google-charts'
import { clearAllToasts, showErrorToast } from '../utils/toastUtils'
import { AxiosResponse } from 'axios'
import moment from 'moment'
import { sendGet } from '../api/axios'
import { ENDPOINTS } from '../api'
import { useParams, useSearchParams } from 'react-router-dom'

const styledAccountBalancePageWrapper = css`
    width: 100%;
    height: 100%;
`

const styledChart = css`
    width: 96%;

    background-color: #ffffff;
    margin: 1em;
    padding: 1em;
    border-radius: 2px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
`

const styledAccountName = css`
    font-weight: 600;
    font-size: 24px;
`

export default function AccountBalancePage() {
    const [date, setDate] = useState(new Date())

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

    const params = useParams()
    const [searchParams] = useSearchParams()
    console.log(searchParams)
    const id: number = Number(params.id)
    const accountName: string = searchParams.get('accountName') as string

    useLayoutEffect(() => {
        const fetchAccountsBalance = async (date: Date) => {
            clearAllToasts()
            try {
                const timestamp: number = moment(date).unix()

                const res: AxiosResponse = await sendGet(
                    ENDPOINTS.fetchAccountBalance(id, timestamp)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    return (
        <div className={styledAccountBalancePageWrapper}>
            <TopBar
                pageNameText={'Account Balance'}
                showIcon={true}
                navigateTo={'/accounts'}
            >
                <CustomMontAndYearPicker
                    date={date}
                    handleDateChange={setDate}
                />
            </TopBar>

            <div className={styledChart}>
                <p className={styledAccountName}>{accountName}</p>
                <Chart
                    width="100%"
                    height="47vh"
                    chartType="LineChart"
                    data={chartData}
                    options={LineChartOptions}
                />
            </div>
        </div>
    )
}
