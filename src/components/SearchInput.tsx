import { css } from '@emotion/css'
import { BiSearch } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'

const styledInputWrapper = css`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 10vw;
    margin-right: 2em;
`

const styledInput = css`
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    padding: 0.5em;
    border-radius: 5px;
    box-sizing: border-box;
    border: solid 2px black;
    cursor: pointer;
    padding-left: 2em;
    pointer-events: all;
`

const styledIcon = (onLeft: boolean = false) => css`
    position: absolute;
    top: 0;
    ${onLeft ? 'left: 0; margin-left: 10px;' : 'right: 0; margin-right: 10px;'}
    font-size: 22px;
    margin-top: 10px;
    cursor: pointer;
`

export default function SearchInput({
    inputName,
    placeholderText,
    value,
    onChangeHandler,
    isDisabled = false,
}: {
    inputName: string
    placeholderText: string
    value: string
    onChangeHandler: (value: string) => void
    isDisabled?: boolean
}) {
    const showXIcon: boolean = !!value.length
    return (
        <div className={styledInputWrapper}>
            <input
                className={styledInput}
                type="search"
                name={inputName}
                placeholder={placeholderText}
                onChange={(e) => onChangeHandler(e.target.value)}
                value={value}
                disabled={isDisabled}
            />
            <BiSearch className={styledIcon(true)} />
            {showXIcon && (
                <RxCross2
                    className={styledIcon()}
                    onClick={() => onChangeHandler('')}
                />
            )}
        </div>
    )
}
