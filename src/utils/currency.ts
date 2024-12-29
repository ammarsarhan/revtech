export default function getCurrencyInEGP (value: number) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'EGP'}).format(value);
}

export function getCurrencyInUSD (value: number) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);
}