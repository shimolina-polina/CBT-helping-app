import { useEntries } from '@/hooks/useEntries';
import { useState } from 'react';
import { formatEntriesForExport } from '@/utils/formatEntriesForExport';
import { Alert } from 'react-native';
import { ScreenShell } from '@/shared/ScreenShell';
import { RoundIconButton } from '@/shared/RoundIconButton';
import { router } from 'expo-router';
import { CustomCalendar as Calendar } from '@/shared/Calendar';
import { DiaryList } from '@/features/entry-list/DiaryList';
import * as Clipboard from 'expo-clipboard';

export default function CalendarSelect() {
    const { entries } = useEntries();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const copyText = () => {
        Clipboard.setStringAsync(
            formatEntriesForExport(
                selectedDate
                    ? entries.filter(
                          (item) =>
                              item.createdAt.slice(0, 10) === selectedDate,
                      )
                    : entries,
            ),
        );
    };

    return (
        <ScreenShell
            right={
                <RoundIconButton
                    icon="share-variant"
                    onPress={() => {
                        copyText();
                    }}
                />
            }
            left={
                <RoundIconButton
                    icon={'format-list-bulleted'}
                    onPress={() => {
                        router.push('/');
                    }}
                />
            }
        >
            <Calendar
                entries={entries}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            {selectedDate && (
                <DiaryList
                    data={entries.filter(
                        (item) => item.createdAt.slice(0, 10) === selectedDate,
                    )}
                />
            )}
        </ScreenShell>
    );
}
