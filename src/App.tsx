import { BrowserRouter } from 'react-router-dom'
import Router from './routes/router'
import { ToastContainer } from 'react-toastify'

function App() {
    return (
        <BrowserRouter>
            <Router />
            <ToastContainer />
        </BrowserRouter>
    )
}

export default App
