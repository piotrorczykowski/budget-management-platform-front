import './Login.css'

export default function Login() {
    return (
        <div id="loginWrapper">
            <form id="loginForm">
                <div>
                    <h1>Welcome to BMP</h1>
                    <h2>Please login in</h2>
                </div>
                <input
                    className="inputField"
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    required
                />

                <input
                    className="inputField"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    required
                />

                <button id="submitBtn" type="submit">
                    Log in
                </button>
            </form>
        </div>
    )
}
