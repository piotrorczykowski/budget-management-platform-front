import { css } from '@emotion/css'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const styledInputWrapper = (isInputTypePassword: boolean) => css`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    position: ${isInputTypePassword ? 'relative' : 'static'};
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
`

const styledErrorMessage = css`
    color: red;
    font-weight: 600;
    margin: 5px 0 0 0;
`

const styledIcon = css`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 65px;
    margin-right: 20px;
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
}) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div
            className={`
                ${styledInputWrapper(isInputTypePassword)} ${customClassName}`}
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
            />

            {isInputTypePassword &&
                (showPassword ? (
                    <AiFillEyeInvisible
                        className={styledIcon}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                ) : (
                    <AiFillEye
                        className={styledIcon}
                        onClick={() => setShowPassword(!showPassword)}
                    />
                ))}

            {errorMessage && (
                <p className={styledErrorMessage}>{errorMessage}</p>
            )}
        </div>
    )
}
