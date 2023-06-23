import { css } from '@emotion/css'

const styledSelectWrapper = css`
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 25vw;
`

const styledLabel = css`
    font-weight: 500;
    font-size: 15px;
    margin-top: 30px;
`

const styledSelect = css`
    width: 25vw;
    font-size: 19px;
    font-weight: 500;
    padding: 20px;
    margin-top: 10px;
    border-radius: 5px;
    border: solid 2px black;

    &:disabled {
        border: solid 2px #aaaaaa;
    }
`

export default function CustomSelect({
    labelText,
    selectName,
    selected,
    options,
    onChangeHandler,
    isDisabled = false,
}: {
    labelText: string
    selectName: string
    selected: string
    options: string[]
    onChangeHandler: (value: string) => void
    isDisabled?: boolean
}) {
    return (
        <div className={styledSelectWrapper}>
            <label className={styledLabel} htmlFor={selectName}>
                {labelText}
            </label>
            <select
                name={selectName}
                className={styledSelect}
                disabled={isDisabled}
                value={selected}
                onChange={(e) => onChangeHandler(e.target.value)}
            >
                {options.map((optionValue) => (
                    <option key={optionValue} value={optionValue}>
                        {optionValue}
                    </option>
                ))}
            </select>
        </div>
    )
}
