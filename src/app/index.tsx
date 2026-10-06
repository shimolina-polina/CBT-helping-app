import { StyleSheet } from 'react-native';
import { RoundIconButton } from '@/shared/RoundIconButton';
import { DiaryList } from '@/features/entry-list/DiaryList';
import { GradientButton } from '@/shared/GradientButton';
import { ScreenShell } from '@/shared/ScreenShell';
import { useFocusEffect, useRouter } from 'expo-router';
import { useEntries } from '@/hooks/useEntries';
import * as Clipboard from 'expo-clipboard';
import { formatEntriesForExport } from '@/utils/formatEntriesForExport';
import { useCallback, useState } from 'react';
import { Entry } from '@/types/Entries';
import { entriesStorage } from '@/storage/entriesStorage';

export default function DiaryScreen() {
    const router = useRouter();
    const { entries, removeEntries } = useEntries();

    const copyText = () => {
        if (selectedItems.length > 0) {
            Clipboard.setStringAsync(formatEntriesForExport(selectedItems));
        } else {
            Clipboard.setStringAsync(formatEntriesForExport(entries));
        }
    };
    const [deleteMode, setDeleteMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Entry[]>([]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setDeleteMode(false);
                setSelectedItems([]);
            };
        }, []),
    );

    return (
        <ScreenShell
            left={
                <RoundIconButton
                    icon={deleteMode ? 'delete' : 'calendar-today'}
                    onPress={async () => {
                        if (deleteMode) {
                            await removeEntries(
                                selectedItems.map((item) => item.id),
                            );

                            setSelectedItems([]);
                            setDeleteMode(false);
                        } else {
                            router.push('/calendar');
                        }
                    }}
                />
            }
            right={
                <RoundIconButton
                    icon="share-variant"
                    onPress={() => {
                        copyText();
                    }}
                />
            }
        >
            <DiaryList
                data={entries}
                deleteMode={deleteMode}
                setDeleteMode={setDeleteMode}
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems}
            />
            <GradientButton
                text="Создать"
                onPress={() => {
                    router.push('/create-entry');
                }}
                style={styles.createBtn}
            />
        </ScreenShell>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    header: {
        height: 72,
        paddingHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sheet: {
        flex: 1,
        paddingHorizontal: 18,
        backgroundColor: '#fff',
        borderTopLeftRadius: 44,
        borderTopRightRadius: 44,
    },
    createBtn: { marginVertical: 20 },
});
