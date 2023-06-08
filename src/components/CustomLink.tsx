import { css } from '@emotion/css'
import { Link } from 'react-router-dom'

const styledLinkWrapper = css`
    font-size: 25px;
    font-weight: 600;
    position: absolute;
    right: 120px;
    top: 60px;
`

const styledLink = css`
    color: #000000;
`

export default function CustomLink({
    linkText,
    linkTo,
}: {
    linkText: string
    linkTo: string
}) {
    return (
        <div className={styledLinkWrapper}>
            <Link className={styledLink} to={linkTo}>
                {linkText}
            </Link>
        </div>
    )
}
