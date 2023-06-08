import { Link } from 'react-router-dom'
import { css } from '@emotion/css'

const styledLinkWrapper = css`
    text-align: end;
    margin-top: 60px;
    font-size: 25px;
    font-weight: 600;
`

const styledLink = css`
    padding-right: 120px;
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
