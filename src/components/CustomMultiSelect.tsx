import { css } from '@emotion/css'
import Select from 'react-select'

const styledCustomMuliSelectWrapper = css`
    margin-top: 30px;
    width: 25vw;
`

const styledLabel = css`
    font-weight: 500;
    font-size: 15px;
`

const customClass = css`
    margin-top: 10px;
`

const customStyles = {
    option: (defaultStyles: any, state: any) => ({
        ...defaultStyles,
        color: '#000000',
        backgroundColor: state.isSelected ? 'hsl(0, 0%, 90%)' : '#ffffff',
    }),

    control: (defaultStyles: any) => ({
        ...defaultStyles,
        padding: '10px',
        border: '2px solid #000000',
        '&:hover': {
            borderColor: '#000000',
        },
        cursor: 'pointer',
        boxShadow: 'none',
    }),
    dropdownIndicator: (defaultStyles: any) => ({
        ...defaultStyles,
        color: '#000000',

        '&:hover': {
            color: '#000000',
        },
    }),
    indicatorSeparator: (defaultStyles: any) => {
        return {
            ...defaultStyles,
            backgroundColor: '#000000',
        }
    },
    placeholder: (defaultStyles: any) => {
        return {
            ...defaultStyles,
            color: '#000000',
        }
    },
    menu: (defaultStyles: any) => ({
        ...defaultStyles,
        fontWeight: '400',
        fontSize: '16px',
        padding: '0.25em 0.5em 0.5em 0.5em',
    }),
}

export default function CustomMultiSelect({
    labelText,
    name,
    handleChange,
    options,
}: {
    labelText: string
    name: string
    handleChange: (selectedOption: any) => void
    options: { value: string; label: string }[]
}) {
    return (
        <div className={styledCustomMuliSelectWrapper}>
            <label className={styledLabel} htmlFor={name}>
                {labelText}
            </label>
            <Select
                name={name}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                isSearchable={true}
                onChange={handleChange}
                options={options}
                className={customClass}
                styles={customStyles}
            />
        </div>
    )
}
