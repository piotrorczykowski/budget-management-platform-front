import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLayoutEffect, useRef, useState } from 'react'
import { sendPost } from '../api/axios'
import { ENDPOINTS } from '../api'
import CustomButton from '../components/CustomButton'
import CustomWelcomeMessage from '../components/CustomWelcomeMessage'
import AlignCenterWrapper from '../components/AlignCenterWrapper'
import { showErrorToast } from '../utils/toastUtils'

export default function EmailVerificationPage() {
    const [searchParams] = useSearchParams()
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const dataFetchedRef = useRef(false)
    const navigate = useNavigate()

    const verifiedEmail = async (): Promise<boolean> => {
        const token: string = searchParams.get('token') as string
        try {
            await sendPost(ENDPOINTS.emailVerification, {
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
        <AlignCenterWrapper paddingTop="35vh">
            {isEmailVerified ? (
                <AlignCenterWrapper>
                    <CustomWelcomeMessage
                        mainText="Email Verification Successfully!"
                        otherText="You can now login.."
                    />

                    <CustomButton
                        buttonText="Login"
                        onClickHandler={() => navigate('/signIn')}
                    />
                </AlignCenterWrapper>
            ) : (
                <AlignCenterWrapper>
                    <CustomWelcomeMessage
                        mainText="Email Verification Failed!"
                        otherText="Please try again."
                    />

                    <CustomButton
                        buttonText="Homepage"
                        onClickHandler={() => navigate('/signIn')}
                    />
                </AlignCenterWrapper>
            )}
        </AlignCenterWrapper>
    )
}
