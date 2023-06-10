import { MdOutlineToll } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { css } from '@emotion/css'

const styledAppLogo = css`
    display: flex;
    align-items: center;
    align-self: flex-start;
    color: #ffffff;
    font-size: 40px;
    font-weight: 600;
`

export default function AppLogo(customClassName?: any) {
    return (
        <Link
            className={styledAppLogo + ' ' + customClassName?.className}
            to="/"
        >
            <MdOutlineToll size="50px" /> BMP
        </Link>
    )
}
