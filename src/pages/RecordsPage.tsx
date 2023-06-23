import { css } from '@emotion/css'
import TopBar from '../components/TopBar'

const styledRecordsPageWrapper = css``

export default function RecordsPage() {
    return (
        <div className={styledRecordsPageWrapper}>
            <TopBar pageNameText={'Records'} />
        </div>
    )
}
