export const MONTHS_EN = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
] as const;

export function getCurrentDate(date: Date): string {
    return `${MONTHS_EN[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}