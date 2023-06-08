import { css } from '@emotion/css'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const styledInputWrapper = (isInputTypePassword: boolean) => css`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    position: ${isInputTypePassword ? 'relative' : 'static'};
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
    inputType = 'text',
    isInputTypePassword = false,
}: {
    labelText: string
    inputName: string
    placeholderText: string
    value: string
    onChangeHandler: (value: string, name?: string) => void
    errorMessage?: string
    inputType?: string
    isInputTypePassword?: boolean
}) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={styledInputWrapper(isInputTypePassword)}>
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
                required
                onChange={(e) => onChangeHandler(e.target.value, e.target.name)}
                value={value}
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
