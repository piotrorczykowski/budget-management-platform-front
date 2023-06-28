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
    width: 100%;
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
    customClassName,
}: {
    labelText: string
    selectName: string
    selected: { id: number; name: string }
    options: { id: number; name: string }[]
    onChangeHandler: ({ id, name }: { id: number; name: string }) => void
    isDisabled?: boolean
    customClassName?: string
}) {
    return (
        <div className={`${styledSelectWrapper} ${customClassName}`}>
            <label className={styledLabel} htmlFor={selectName}>
                {labelText}
            </label>
            <select
                name={selectName}
                className={styledSelect}
                disabled={isDisabled}
                value={selected.id}
                onChange={(e) => {
                    onChangeHandler({
                        id: Number(e.target.value),
                        name: e.target.options[e.target.selectedIndex].text,
                    })
                }}
            >
                {options.map((optionValue) => (
                    <option key={optionValue.id} value={optionValue.id}>
                        {optionValue.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
