import { css } from '@emotion/css'
import TopBar from '../components/TopBar'
import SearchInput from '../components/SearchInput'
import { useState } from 'react'
import CustomSelect from '../components/CustomSelect'
import { RecordType, SortingOptions } from '../types/enums'
import SideBarFilter from '../components/SideBarFilter'

const styledRecordPageWrapper = css`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const styledRecordsPageContent = css`
    // display: flex;
    position: relative;

    height: 100%;
`

const customClassName = css`
    width: 13vw;
    flex-direction: row;
    justify-content: space-between;
    margin-left: auto;
    margin-right: 1em;
    height: 40px;
    margin-top: 1em;
`

const customInputClassName = css`
    width: 10vw;
    font-size: 15px;
    padding: 0.5em;
    font-weight: 500;
    margin-top: 0px;
`

export default function RecordsPage() {
    const sortingOptions: { id: number; name: string }[] = Object.values(
        SortingOptions
    ).map((sortingOption, index) => {
        return { id: index, name: sortingOption }
    })
    const [sortingOption, setSortingOption] = useState(sortingOptions[0])

    const [searchByValue, setSearchByValue] = useState('')
    const [recordType, setRecordType] = useState(RecordType.All)
    const [account, setAccount] = useState({ id: -1, name: '-' })
    const [category, setCategory] = useState({ id: -1, name: '-' })

    console.log(recordType)

    return (
        <div className={styledRecordPageWrapper}>
            <TopBar pageNameText={'Records'}>
                <SearchInput
                    inputName="Search"
                    placeholderText="Search"
                    value={searchByValue}
                    onChangeHandler={setSearchByValue}
                />
            </TopBar>

            <div className={styledRecordsPageContent}>
                <CustomSelect
                    labelText="Sort by"
                    selectName="sortBy"
                    selected={sortingOption}
                    options={sortingOptions}
                    onChangeHandler={setSortingOption}
                    customInputClassName={customInputClassName}
                    customClassName={customClassName}
                />

                <SideBarFilter
                    selectedRecordType={recordType}
                    onRecordTypeChangeHandler={(e) =>
                        setRecordType(e.target.value)
                    }
                    selectedAccount={account}
                    onAccountChangeHandler={setAccount}
                    selectedCategory={category}
                    onCategoryChangeHandler={setCategory}
                />
            </div>
        </div>
    )
}
