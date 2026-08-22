export function formatCurrency(amount: number | string): string {
    return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        maximumFractionDigits: 0,

    }).format(Number(amount))
}

export function formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat('pl-PL', {
        day: "numeric",
        month: 'long',
        year: 'numeric',
    }).format(new Date(date))
}