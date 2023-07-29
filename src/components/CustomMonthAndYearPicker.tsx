import { css } from '@emotion/css'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'

const styledCustomMontAndYearPickerWrapper = css`
    display: flex;
    align-items: center;
    margin-right: 2em;
`

const customDatePickerClass = css`
    padding: 0.5em;
    border: 2px solid #000000;
    border-radius: 2px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;

    &:hover {
        opacity: 0.6;
    }
`

const styledIcon = css`
    margin-left: 0.5em;
    margin-right: 0.5em;
    cursor: pointer;

    &:hover {
        opacity: 0.6;
    }
`

export default function CustomMontAndYearPicker({
    date,
    handleDateChange,
}: {
    date: Date
    handleDateChange: (date: Date) => void
}) {
    return (
        <div className={styledCustomMontAndYearPickerWrapper}>
            <BiSolidLeftArrow
                className={styledIcon}
                onClick={() =>
                    handleDateChange(moment(date).subtract(1, 'month').toDate())
                }
            />
            <DatePicker
                className={customDatePickerClass}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                selected={date}
                onChange={handleDateChange}
            />
            <BiSolidRightArrow
                className={styledIcon}
                onClick={() =>
                    handleDateChange(moment(date).add(1, 'month').toDate())
                }
            />
        </div>
    )
}
