import { css } from '@emotion/css'
import TopBar from '../components/TopBar'

const styledSettingsPageWrapper = css``

export default function SettingsPage() {
    return (
        <div className={styledSettingsPageWrapper}>
            <TopBar pageNameText={'Settings'} />
        </div>
    )
}
