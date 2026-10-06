import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { FormField } from '@/shared/FormField';
import { GradientButton } from '@/shared/GradientButton';
import { useRouter } from 'expo-router';
import { entriesStorage } from '@/storage/entriesStorage';
import { DateField } from '@/shared/DateField';
import { Entry } from '@/types/Entries';

export type EntryForm = {
    createdAt: string; // ISO, дата записи
    situation: string;
    thoughts: string;
    emotions: string;
    reactions: string;
};

export default function CreateEntry({
    id,
    entry,
}: {
    id?: string;
    entry?: Entry;
}) {
    const [form, setForm] = useState<EntryForm>({
        createdAt: new Date().toISOString(),
        situation: '',
        thoughts: '',
        emotions: '',
        reactions: '',
    });

    useEffect(() => {
        if (!entry) return;
        setForm({
            createdAt: entry.createdAt,
            situation: entry.situation,
            thoughts: entry.thoughts,
            emotions: entry.emotions,
            reactions: entry.reactions,
        });
    }, [entry]);

    const set = (key: keyof EntryForm) => (text: string) =>
        setForm((prev) => ({ ...prev, [key]: text }));
    const router = useRouter();
    const onSave = async (form: EntryForm) => {
        if (Object.values(form).every((v) => !v.trim())) {
            Alert.alert('Пустая запись', 'Заполните хотя бы одно поле.');
            return;
        }

        try {
            if (entry && id) {
                await entriesStorage.update(id, form);
            } else {
                await entriesStorage.add(form);
            }

            router.back();
        } catch {
            Alert.alert(
                'Ошибка',
                'Не удалось сохранить запись. Попробуйте ещё раз.',
            );
        }
    };

    return (
        <>
            <ScrollView
                style={styles.flex}
                contentContainerStyle={styles.fields}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <DateField value={form.createdAt} onChange={set('createdAt')} />
                <FormField
                    label="Ситуация"
                    value={form.situation}
                    onChangeText={set('situation')}
                />
                <FormField
                    label="Мысли"
                    value={form.thoughts}
                    onChangeText={set('thoughts')}
                />
                <FormField
                    label="Эмоции"
                    value={form.emotions}
                    onChangeText={set('emotions')}
                />
                <FormField
                    label="Реакции"
                    value={form.reactions}
                    onChangeText={set('reactions')}
                />
            </ScrollView>

            <GradientButton
                text="Сохранить"
                onPress={() => onSave(form)}
                style={styles.save}
            />
        </>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    fields: { paddingTop: 20, gap: 16 },
    save: { marginTop: 20 },
});
