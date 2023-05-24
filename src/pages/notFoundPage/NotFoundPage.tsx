import { Link } from 'react-router-dom'
import './NotFoundPage.css'

function NotFoundPage() {
    return (
        <div id="notFoundPageWrapper">
            <div id="statusCode">404</div>
            <div id="message">Something went wrong!</div>
            <div id="backButton">
                <Link id="backLink" to="/">
                    Back to Homepage
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage
