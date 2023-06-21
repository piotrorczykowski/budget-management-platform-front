import { css } from '@emotion/css'
import { TbMathGreater } from 'react-icons/tb'
import Record from './Record'
import { useNavigate } from 'react-router-dom'

const styledRecordsListWrapper = css`
    width: 97.5%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 2px;
    margin: 1em;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
`

const styledHeader = css`
    padding: 1em;
    font-weight: 600;
    width: 96.5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const styledRecentRecordText = css`
    padding: 0.5em;
    font-size: 24px;
`

const styledSeeAllRecords = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5em;
    border-radius: 2px;
    text-align: center;
    font-size: 18px;

    &:hover {
        background-color: #f0f0f080;
    }
`

const styledRecords = css`
    padding: 0 1em 0 1em;
`

export default function RecordsList() {
    const navigate = useNavigate()

    // TODO add fetching account from the backend
    const records: {
        category: string
        date: string
        accountName: string
        amount: number
        isExpense?: boolean
        description?: string
    }[] = [
        {
            category: 'Food',
            date: '06.30.2023',
            accountName: 'Savings',
            amount: 2345.95,
            isExpense: true,
            description: 'New computer',
        },
        {
            category: 'Salary',
            date: '06.07.2023',
            accountName: 'Millenium',
            amount: 6345.95,
        },
        {
            category: 'House',
            date: '06.30.2023',
            accountName: 'mBank',
            amount: 2345.95,
            isExpense: true,
        },
        {
            category: 'Food',
            date: '06.12.2023',
            accountName: 'Millenium',
            amount: 3.99,
            isExpense: true,
            description: 'Hot Dog',
        },
        {
            category: 'Food',
            date: '06.24.2023',
            accountName: 'mBank',
            amount: 421.95,
            isExpense: true,
        },
        {
            category: 'Alcohol',
            date: '06.05.2023',
            accountName: 'Millenium',
            amount: 52.95,
            isExpense: true,
            description: 'Wine for friend',
        },
        {
            category: 'Food',
            date: '06.20.2023',
            accountName: 'mBank',
            amount: 23.95,
            isExpense: true,
        },
    ]

    return (
        <div className={styledRecordsListWrapper}>
            <div className={styledHeader}>
                <p className={styledRecentRecordText}>Recent Records</p>

                <div
                    className={styledSeeAllRecords}
                    onClick={() => navigate('/records')}
                >
                    <p>See All</p>
                    <TbMathGreater size="15px" />
                </div>
            </div>
            <div className={styledRecords}>
                {records.map((record) => {
                    return (
                        <Record
                            category={record.category}
                            date={record.date}
                            accountName={record.accountName}
                            amount={record.amount}
                            isExpense={record.isExpense}
                            description={record.description}
                        />
                    )
                })}
            </div>
        </div>
    )
}
