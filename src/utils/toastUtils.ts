import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const showErrorToast = (message: string) => {
    toast.error(message || 'Network Error', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 500,
        pauseOnHover: false,
        hideProgressBar: true,
    })
}

export const showSuccessToast = (message: string) => {
    toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 500,
        pauseOnHover: false,
        hideProgressBar: true,
    })
}

export const clearAllToasts = () => toast.dismiss()
