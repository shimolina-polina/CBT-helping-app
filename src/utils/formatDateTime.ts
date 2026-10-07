export const formatDateTime = (iso: string) => {
    const date = new Date(iso);

    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatDate = (iso: string) => {
    const date = new Date(iso);

    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};