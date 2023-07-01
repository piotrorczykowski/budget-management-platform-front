import { css } from '@emotion/css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const styledDatePickerWrapper = css`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    width: 25vw;
`

const styledDatePicker = css`
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    padding: 20px 0 20px 0;
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

const styledErrorMessage = css`
    color: red;
    font-weight: 600;
    font-size: 14px;
    margin: 5px 0 0 0;
`

export default function CustomDatePicker({
    labelText,
    selectedDate,
    onChangeHandler,
    errorMessage = '',
    customClassName,
}: {
    labelText: string
    selectedDate: Date
    onChangeHandler: (value: Date) => void
    errorMessage?: string
    customClassName?: string
}) {
    return (
        <div className={`${styledDatePickerWrapper} ${customClassName}`}>
            <label className={styledLabel} htmlFor="date">
                {labelText}
            </label>
            <DatePicker
                name="date"
                className={styledDatePicker}
                selected={selectedDate}
                onChange={(date: Date) => onChangeHandler(date)}
                dateFormat="dd/MM/yyyy"
            />
            {errorMessage && (
                <p className={styledErrorMessage}>{errorMessage}</p>
            )}
        </div>
    )
}
