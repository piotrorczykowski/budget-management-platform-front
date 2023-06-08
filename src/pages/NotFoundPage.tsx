import { Link } from 'react-router-dom'
import { css } from '@emotion/css'

const styledNotFoundPageWrapper = css`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const styledStatusCode = css`
    font-size: 200px;
    font-weight: 600;
    margin-top: -200px;
`

const styledMessage = css`
    font-size: 30px;
    font-weight: 600;
`

const styledBackLink = css`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    background-color: #040605;
    color: #f0f0f0;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    padding: 10px;
    width: 20vw;
    border-radius: 5px;
`

function NotFoundPage() {
    return (
        <div className={styledNotFoundPageWrapper}>
            <div className={styledStatusCode}>404</div>
            <div className={styledMessage}>Something went wrong!</div>
            <Link className={styledBackLink} to="/">
                Back to Homepage
            </Link>
        </div>
    )
}

export default NotFoundPage
