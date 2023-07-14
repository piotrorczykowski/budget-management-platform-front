export type RecordObjectType = {
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
