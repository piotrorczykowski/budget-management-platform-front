import { Category } from '../../../types/enums'

export type Budget = {
    id: number
    name: string
    planned: number
    spent: number
    startDate: Date
    endDate: Date
    categories: Category[]
}
