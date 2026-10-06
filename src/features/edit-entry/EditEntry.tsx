import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { entriesStorage } from '@/storage/entriesStorage';
import { Alert } from 'react-native';
import CreateEntry from '@/features/create-entry/CreateEntry';
import { Entry } from '@/types/Entries';

export const EditEntry = () => {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const router = useRouter();
    const [entry, setEntry] = useState<Entry>();
    useEffect(() => {
        (async () => {
            if (id) {
                const entry = await entriesStorage.getById(id);
                if (!entry) {
                    Alert.alert('Ошибка', 'Запись не найдена.');
                    router.back();
                    return;
                }
                setEntry(entry);
            }
        })();
    }, []);

    return <CreateEntry id={id} entry={entry} />;
};
