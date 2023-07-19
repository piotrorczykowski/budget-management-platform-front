export enum Currency {
    PLN = 'PLN',
    EUR = 'EUR',
    USD = 'USD',
    GBP = 'GBP',
}

export enum Category {
    Food = 'Food',
    Shopping = 'Shopping',
    Housing = 'Housing',
    Transportation = 'Transportation',
    Vehicle = 'Vehicle',
    Entertainment = 'Entertainment',
    Communication = 'Communication',
    FinancialExpenses = 'Financial Expenses',
    Other = 'Other',
}

export enum UtilsCategory {
    Income = 'Income',
    Transfer = 'Transfer',
}

export enum RecordType {
    All = 'All',
    Expense = 'Expense',
    Income = 'Income',
    Transfer = 'Transfer',
}

export enum SortingOptions {
    DateAsc = 'Date (old to new)',
    DateDesc = 'Date (new to old)',
    AmountAsc = 'Amount (lower to higher)',
    AmountDesc = 'Amount (higher to lower)',
}
