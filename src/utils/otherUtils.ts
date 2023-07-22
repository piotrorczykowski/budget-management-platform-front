import { Currency } from '../types/enums'

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getCurrencySymbol = (currency: Currency) => {
    switch (currency) {
        case Currency.EUR:
            return '\u20AC'
        case Currency.GBP:
            return '\u00A3'
        case Currency.PLN:
            return 'z\u0142'
        case Currency.USD:
            return '\u0024'
    }
}
