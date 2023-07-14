export type RecordsFetchType = {
    sortingOption: string
    searchByValue: string
    recordType: string
    accountId: number
    category: string
}

export type Record = {
    id: number
    category: string
    date: string
    amount: number
    isExpense: boolean
    isTransfer: boolean
    description: string
    account: {
        id: number
        name: string
    }
}
