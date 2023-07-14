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
    align-self: inherit;
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

const styledErrorMessage = (shouldHideMessage: boolean) => css`
    ${shouldHideMessage ? 'opacity: 0;' : 'opacity: 1;'}
    font-size: 14px;
    color: red;
    font-weight: 600;
    margin: 5px 0 0 0;
`

export default function CustomSelect({
    labelText,
    selectName,
    selected,
    options,
    onChangeHandler,
    errorMessage = '',
    isDisabled = false,
    customClassName,
    customInputClassName,
    shouldHideMessage = false,
}: {
    labelText: string
    selectName: string
    selected: { id: number; name: string }
    options: { id: number; name: string }[]
    onChangeHandler: ({ id, name }: { id: number; name: string }) => void
    errorMessage?: string
    isDisabled?: boolean
    customClassName?: string
    customInputClassName?: string
    shouldHideMessage?: boolean
}) {
    return (
        <div className={`${styledSelectWrapper} ${customClassName}`}>
            <label className={styledLabel} htmlFor={selectName}>
                {labelText}
            </label>
            <select
                name={selectName}
                className={`${styledSelect} ${customInputClassName}`}
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
                    <option
                        key={optionValue.id}
                        value={optionValue.id}
                        disabled={!optionValue.id}
                    >
                        {optionValue.name}
                    </option>
                ))}
            </select>
            {errorMessage && (
                <p className={styledErrorMessage(shouldHideMessage)}>
                    {errorMessage}
                </p>
            )}
        </div>
    )
}
