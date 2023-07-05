import { css } from '@emotion/css'

const styledCustomInputRadioWrapper = css`
    margin-top: 1em;
`
const styledLabel = css`
    font-weight: 500;
`

const styledOption = css`
    cursor: pointer;
    margin-top: 0.5em;
`

const styledInput = css`
    cursor: pointer;
    accent-color: black;
    transform: scale(1.2);
`

const styledValue = css`
    cursor: pointer;
    padding-left: 0.5em;
`

export default function CustomInputRadio({
    labelText,
    options,
    selectedOption,
}: {
    labelText: string
    options: {
        id: string
        name: string
        value: string
        onChangeHandler: (e: any) => void
    }[]
    selectedOption: string
}) {
    return (
        <div className={styledCustomInputRadioWrapper}>
            <fieldset>
                <label className={styledLabel}>{labelText}</label>
                {options.map((option) => {
                    return (
                        <div className={styledOption} key={option.id}>
                            <input
                                type="radio"
                                id={option.id}
                                name={option.name}
                                className={styledInput}
                                value={option.value}
                                checked={selectedOption === option.value}
                                onChange={option.onChangeHandler}
                            />
                            <label className={styledValue} htmlFor={option.id}>
                                {option.value}
                            </label>
                        </div>
                    )
                })}
            </fieldset>
        </div>
    )
}
