export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US',
) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};

interface Timestamp {
    seconds: number;
    nanoseconds: number;
}

export const formatTimestamp = (timestamp: Timestamp)=> {
    const { seconds, nanoseconds } = timestamp;
    const date = new Date((seconds * 1000) + (nanoseconds / 1000000));

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}