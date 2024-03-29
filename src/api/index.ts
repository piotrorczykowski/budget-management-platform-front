import { RecordType, SortingOptions } from '../types/enums'

export const ENDPOINTS = {
    // Auth Section
    signIn: '/auth/signIn',
    signUp: '/auth/signUp',
    resendActivationEmail: '/auth/resend-activation-mail',
    emailVerification: '/auth/activate-user',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',

    // Mails Section
    userActivationMail: '/mails/user-activation/test',
    resetPasswordMail: '/mails/user-password/test',

    // CronJobs Section
    forceJobs: '/cron-jobs/force',

    // Users Section
    fetchProfile: '/users/me',
    updateUser: (userId: number) => `/users/${userId}`,
    fetchPaginatedUsers: (
        page: number,
        pageSize: number,
        searchByValue: string = ''
    ) =>
        `/users/?page=${page}&pageSize=${pageSize}&searchByValue=${searchByValue}`,

    // Accounts Section
    createAccount: '/accounts/',
    fetchUserAccounts: (userId: number, searchByValue: string = '') =>
        `/accounts/${userId}?searchByValue=${searchByValue}`,
    updateAccount: (accountId: number) => `/accounts/${accountId}`,
    deleteAccount: (accountId: number) => `/accounts/${accountId}`,

    // Records Section
    fetchPaginatedUserRecords: (
        userId: number,
        page: number,
        pageSize: number,
        sortingOptions: string = SortingOptions.DateDesc,
        searchByValue: string = '',
        recordType: string = RecordType.All,
        accountId: number = 0,
        category: string = 'All'
    ) =>
        `/records/${userId}?page=${page}&pageSize=${pageSize}&sortingOption=${sortingOptions}&searchByValue=${searchByValue}&recordType=${recordType}&accountId=${accountId}&category=${category}`,
    createRecord: '/records/',
    updateRecord: (recordId: number) => `/records/${recordId}`,
    deleteRecord: (recordId: number) => `/records/${recordId}`,

    // Budgets Section
    fetchPaginatedUserBudgets: (
        userId: number,
        page: number,
        pageSize: number,
        searchByValue: string = ''
    ) =>
        `/budgets/${userId}?page=${page}&pageSize=${pageSize}&searchByValue=${searchByValue}`,
    createBudget: '/budgets/',
    updateBudget: (budgetId: number) => `/budgets/${budgetId}`,
    deleteBudget: (budgetId: number) => `/budgets/${budgetId}`,

    // Analytics Section
    fetchCashFlow: (userId: number, timestamp: number) =>
        `/analytics/${userId}/cash-flow/${timestamp}`,
    fetchExpensesStructure: (userId: number, timestamp: number) =>
        `/analytics/${userId}/expenses-structure/${timestamp}`,
    fetchAccountsBalance: (userId: number, timestamp: number) =>
        `/analytics/${userId}/accounts-balance/${timestamp}`,
    fetchAccountBalance: (accountId: number, timestamp: number) =>
        `/analytics/${accountId}/account-balance/${timestamp}`,
}
