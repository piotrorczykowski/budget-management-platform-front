import { css } from '@emotion/css'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const styledDatePickerWrapper = css`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`

const styledDatePicker = css`
    font-size: 20px;
    font-weight: 500;
    padding: 20px 0 20px 0;
    width: 25vw;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    border: solid 2px black;
`

const styledLabel = css`
    font-weight: 500;
    font-size: 15px;
`

export default function CustomDatePicker({ labelText }: { labelText: string }) {
    const [startDate, setStartDate] = useState(new Date())

    return (
        <div className={styledDatePickerWrapper}>
            <label className={styledLabel} htmlFor="date">
                {labelText}
            </label>
            <DatePicker
                name="date"
                className={styledDatePicker}
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
            />
        </div>
    )
}
