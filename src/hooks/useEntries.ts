import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { entriesStorage } from '@/storage/entriesStorage';
import { Entry } from '@/types/Entries';

export function useEntries() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            let active = true;
            entriesStorage.getAll().then((data) => {
                if (!active) return;
                setEntries(data);
                setLoading(false);
            });
            return () => {
                active = false;
            };
        }, []),
    );

    const removeEntries = async (ids: string[]) => {
        await entriesStorage.remove(ids);

        entriesStorage.getAll().then((data) => {
            setEntries(data);
            setLoading(false);
        });
    };

    return { entries, loading, removeEntries };
}
