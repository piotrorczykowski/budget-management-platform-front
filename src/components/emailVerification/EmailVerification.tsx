import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLayoutEffect, useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import api from '../../api/axios'
import { ENDPOINTS } from '../../api'
import { showErrorToast } from '../../utils/toastUtils'
import styles from './EmailVerification.module.css'

export default function EmailVerification() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const dataFetchedRef = useRef(false)
    const navigate = useNavigate()

    const verifiedEmail = async (): Promise<boolean> => {
        const token: string = searchParams.get('token') as string
        try {
            await api.post(ENDPOINTS.emailVerification, {
                token: token,
            })
            return true
        } catch (e: any) {
            showErrorToast(e.response.data.Error)
            return false
        }
    }

    useLayoutEffect(() => {
        if (dataFetchedRef.current) return
        dataFetchedRef.current = true

        verifiedEmail().then((isEmailVerified: boolean) => {
            setIsEmailVerified(isEmailVerified)
        })
    }, [])

    return (
        <div id={styles.emailVerificationWrapper}>
            {isEmailVerified ? (
                <div>
                    <p className={styles.message}>
                        Email Verification Successfully!
                    </p>
                    <p className={styles.message}>You can now login.</p>
                    <button
                        className={styles.customBtn}
                        type="button"
                        onClick={() => navigate('/signIn')}
                    >
                        Login
                    </button>
                </div>
            ) : (
                <div>
                    <p className={styles.message}>Email Verification Failed!</p>
                    <p className={styles.message}>Please try again.</p>
                    <button
                        className={styles.customBtn}
                        type="button"
                        onClick={() => navigate('/signIn')}
                    >
                        Homepage
                    </button>
                </div>
            )}
            <ToastContainer />
        </div>
    )
}
