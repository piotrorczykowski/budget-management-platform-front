import { css } from '@emotion/css'
import { useState } from 'react'
import {
    AiFillEye,
    AiFillEyeInvisible,
    AiOutlineMinus,
    AiOutlinePlus,
} from 'react-icons/ai'

const styledInputWrapper = (isInputWithIcon: boolean) => css`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    position: ${isInputWithIcon ? 'relative' : 'static'};
    width: 25vw;
`

const styledLabel = css`
    font-weight: 500;
`

const styledInput = css`
    font-size: 20px;
    font-weight: 500;
    padding: 20px;
    margin-top: 10px;
    width: 25vw;
    border-radius: 5px;
    box-sizing: border-box;
    border: solid 2px black;
`

const styledErrorMessage = css`
    color: red;
    font-weight: 600;
    margin: 5px 0 0 0;
`

const styledIcon = (onLeft: boolean = false) => css`
    position: absolute;
    top: 0;
    ${onLeft ? 'left: 0; margin-left: 20px;' : 'right: 0; margin-right: 20px;'}
    width: 30px;
    height: 65px;
    margin-top: 35px;
    cursor: pointer;
`

export default function CustomInputText({
    labelText,
    inputName,
    placeholderText,
    value,
    onChangeHandler,
    errorMessage = '',
    customClassName,
    inputType = 'text',
    isInputTypePassword = false,
    isDisabled = false,
    isRequired = true,
    minValue = 0,
    showNumberSign = false,
    isNegative = false,
}: {
    labelText: string
    inputName: string
    placeholderText: string
    value: string
    onChangeHandler: (value: string, name?: string) => void
    customClassName?: string
    errorMessage?: string
    inputType?: string
    isInputTypePassword?: boolean
    isDisabled?: boolean
    isRequired?: boolean
    minValue?: number
    showNumberSign?: boolean
    isNegative?: boolean
}) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div
            className={`
                ${styledInputWrapper(
                    isInputTypePassword || showNumberSign
                )} ${customClassName}`}
        >
            <label className={styledLabel} htmlFor={inputName}>
                {labelText}
            </label>
            <input
                className={styledInput}
                type={
                    isInputTypePassword
                        ? showPassword
                            ? 'text'
                            : inputType
                        : inputType
                }
                name={inputName}
                placeholder={placeholderText}
                autoComplete="new-username"
                required={isRequired}
                onChange={(e) => onChangeHandler(e.target.value, e.target.name)}
                value={value}
                disabled={isDisabled}
                min={minValue}
            />

            {isInputTypePassword &&
                (showPassword && !isDisabled ? (
                    <AiFillEyeInvisible
                        className={styledIcon()}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                ) : (
                    !isDisabled && (
                        <AiFillEye
                            className={styledIcon()}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    )
                ))}

            {errorMessage && (
                <p className={styledErrorMessage}>{errorMessage}</p>
            )}

            {showNumberSign &&
                (isNegative ? (
                    <AiOutlineMinus className={styledIcon(true)} />
                ) : (
                    <AiOutlinePlus className={styledIcon(true)} />
                ))}
        </div>
    )
}
