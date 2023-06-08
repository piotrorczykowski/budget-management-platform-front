import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLayoutEffect, useRef, useState } from 'react'
import api from '../../api/axios'
import { ENDPOINTS } from '../../api'
import { showErrorToast } from '../../utils/toastUtils'
import styles from './EmailVerification.module.css'
import CustomButton from '../CustomButton'

export default function EmailVerification() {
    const [searchParams] = useSearchParams()
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id={styles.emailVerificationWrapper}>
            {isEmailVerified ? (
                <div>
                    <p className={styles.message}>
                        Email Verification Successfully!
                    </p>
                    <p className={styles.message}>You can now login.</p>

                    <CustomButton
                        buttonText="Login"
                        onClickHandler={() => navigate('/signIn')}
                    />
                </div>
            ) : (
                <div>
                    <p className={styles.message}>Email Verification Failed!</p>
                    <p className={styles.message}>Please try again.</p>
                    <CustomButton
                        buttonText="Homepage"
                        onClickHandler={() => navigate('/signIn')}
                    />
                </div>
            )}
        </div>
    )
}
