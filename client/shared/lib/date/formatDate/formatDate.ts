export function formatDate(dateString: string) {
    const date = new Date(dateString);

    const formattedDate = date
        .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        .replace(/\//g, '.');

    const formattedTime = date.toLocaleTimeString('en-GB');
    const formattedDateTime = `${formattedDate} in ${formattedTime}`;

    return formattedDateTime;
}
