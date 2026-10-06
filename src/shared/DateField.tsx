import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, {
    DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatDate } from '@/utils/formatDateTime';
import { useTheme } from '@/hooks/use-theme';

type Props = {
    value: string; // ISO
    onChange: (iso: string) => void;
    label?: string;
};

export function DateField({ value, onChange, label = 'Дата' }: Props) {
    const [showIOS, setShowIOS] = useState(false);
    const date = new Date(value);
    const { colors, isDark } = useTheme();

    // меняем только день, время записи сохраняем
    const apply = (picked: Date) => {
        const next = new Date(value);
        next.setFullYear(
            picked.getFullYear(),
            picked.getMonth(),
            picked.getDate(),
        );
        onChange(next.toISOString());
    };

    const open = () => {
        if (Platform.OS === 'android') {
            DateTimePickerAndroid.open({
                value: date,
                mode: 'date',
                maximumDate: new Date(),
                onValueChange: (e, picked) => {
                    if (picked) {
                        apply(picked);
                    }
                },
            });
        } else {
            setShowIOS((v) => !v);
        }
    };

    return (
        <View>
            <Pressable
                onPress={open}
                style={({ pressed }) => [
                    styles.field,
                    pressed && { opacity: 0.7 },
                ]}
            >
                <Text style={[styles.label, { color: colors.placeholder }]}>
                    {label}
                </Text>
                <View style={styles.valueRow}>
                    <Text style={[styles.value, { color: colors.text }]}>
                        {formatDate(value)}
                    </Text>
                    <MaterialCommunityIcons
                        name="calendar-today"
                        size={20}
                        color={colors.accent}
                    />
                </View>
            </Pressable>

            {Platform.OS === 'ios' && showIOS && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    locale="ru-RU"
                    themeVariant={isDark ? 'dark' : 'light'}
                    maximumDate={new Date()}
                    onChange={(_, picked) => picked && apply(picked)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    field: {
        height: 56,
        paddingHorizontal: 18,
        borderRadius: 28,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: { fontSize: 16 },
    valueRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    value: { fontSize: 16 },
});
