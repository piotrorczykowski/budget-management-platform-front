export const ENDPOINTS = {
    signIn: '/auth/signIn',
    signUp: '/auth/signUp',
    resendActivationEmail: '/auth/resend-activation-mail',
    emailVerification: '/auth/activate-user',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    fetchProfile: '/users/me',
    updateUser: (userId: number) => `/users/${userId}`,
    createAccount: '/accounts/',
    fetchUserAccounts: (userId: number) => `/accounts/${userId}`,
    fetchPaginatedUserRecords: (
        userId: number,
        page: number,
        pageSize: number
    ) => `/records/${userId}?page=${page}&pageSize=${pageSize}`,
}
