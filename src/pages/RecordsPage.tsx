import { css } from '@emotion/css'
import TopBar from '../components/TopBar'
import SearchInput from '../components/SearchInput'
import { useState } from 'react'

const styledRecordsPageWrapper = css``

export default function RecordsPage() {
    const [searchByValue, setSearchByValue] = useState('')
    return (
        <div className={styledRecordsPageWrapper}>
            <TopBar pageNameText={'Records'}>
                <SearchInput
                    inputName="Search"
                    placeholderText="Search"
                    value={searchByValue}
                    onChangeHandler={setSearchByValue}
                />
            </TopBar>
        </div>
    )
}
