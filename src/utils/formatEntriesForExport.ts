import { Entry } from '@/types/Entries';

import { formatDateTime } from './formatDateTime';

const FIELDS: {
    key: 'situation' | 'thoughts' | 'emotions' | 'reactions';
    label: string;
}[] = [
    { key: 'situation', label: 'Ситуация' },
    { key: 'thoughts', label: 'Мысли' },
    { key: 'emotions', label: 'Эмоции' },
    { key: 'reactions', label: 'Реакции' },
];

/** Текст для отправки психологу: записи от старых к новым */
export function formatEntriesForExport(entries: Entry[]) {
    const sorted = [...entries].sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt),
    );

    const blocks = sorted.map((e) => {
        const lines = FIELDS.map(
            ({ key, label }) => `${label}: ${e[key].trim() || '—'}`,
        );
        return [`📅 ${formatDateTime(e.createdAt)}`, ...lines].join('\n');
    });

    return [`Дневник СМЭР. Записей: ${sorted.length}`, ...blocks].join('\n\n');
}
