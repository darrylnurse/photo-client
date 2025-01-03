export default function  getCurrentDate (): string {
    const date: Date = new Date();
    return date.toISOString();
}