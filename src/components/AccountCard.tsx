import { css } from '@emotion/css'
import { IoWallet } from 'react-icons/io5'

const styledRecordWrapper = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #ffffff;

    font-weight: 500;
    margin-bottom: 1em;
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

const styledAccountNameAndIcon = css`
    display: flex;
    align-items: center;
`

const styledAccountName = css`
    color: #626569;
    width: 20%;
    margin-left: 1em;
`

const styledAccountBalance = css`
    font-weight: 600;
    color: '#626569';
    text-align: right;
    width: 20%;
`

export default function AccountCard({
    name,
    balance,
}: {
    name: string
    balance: number
}) {
    const isNegative: boolean = balance < 0
    return (
        <div className={styledRecordWrapper}>
            <div className={styledAccountNameAndIcon}>
                <IoWallet size={30} />
                <p className={styledAccountName}>{name}</p>
            </div>
            <p className={styledAccountBalance}>
                {isNegative && '-'}&#36;{Number(Math.abs(balance)).toFixed(2)}
            </p>
        </div>
    )
}
