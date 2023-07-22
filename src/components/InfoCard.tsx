import { css } from '@emotion/css'

const styledRecordWrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #ffffff;
    border-radius: 2px;
    background-color: #ffffff;
    padding: 1em;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.2);
    font-weight: 500;
    font-size: 18px;
    color: #bebfbf;
`

export default function InfoCard({ message }: { message: string }) {
    return <div className={styledRecordWrapper}>{message}</div>
}
