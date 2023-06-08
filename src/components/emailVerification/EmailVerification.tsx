import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLayoutEffect, useRef, useState } from 'react'
import api from '../../api/axios'
import { ENDPOINTS } from '../../api'
import { showErrorToast } from '../../utils/toastUtils'
import styles from './EmailVerification.module.css'
import CustomButton from '../CustomButton'
import CustomWelcomeMessage from '../CustomWelcomeMessage'
import { css } from '@emotion/css'

const styledAlignCenterWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`

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
                <div className={styledAlignCenterWrapper}>
                    <CustomWelcomeMessage
                        mainText="Email Verification Successfully!"
                        otherText="You can now login.."
                    />

                    <CustomButton
                        buttonText="Login"
                        onClickHandler={() => navigate('/signIn')}
                    />
                </div>
            ) : (
                <div className={styledAlignCenterWrapper}>
                    <CustomWelcomeMessage
                        mainText="Email Verification Failed!"
                        otherText="Please try again."
                    />

                    <CustomButton
                        buttonText="Homepage"
                        onClickHandler={() => navigate('/signIn')}
                    />
                </div>
            )}
        </div>
    )
}
