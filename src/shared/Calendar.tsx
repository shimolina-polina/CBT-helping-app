import { Calendar, LocaleConfig } from 'react-native-calendars';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { Entry } from '@/types/Entries';
import { useTheme } from '@/hooks/use-theme';

LocaleConfig.locales.ru = {
    monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],

    monthNamesShort: [
        'Янв.',
        'Февр.',
        'Март',
        'Апр.',
        'Май',
        'Июнь',
        'Июль',
        'Авг.',
        'Сент.',
        'Окт.',
        'Нояб.',
        'Дек.',
    ],

    dayNames: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ],

    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сегодня',
};

LocaleConfig.defaultLocale = 'ru';

export const CustomCalendar = ({
    entries,
    selectedDate,
    setSelectedDate,
}: {
    entries: Entry[];
    selectedDate: string | null;
    setSelectedDate: Dispatch<SetStateAction<string | null>>;
}) => {
    const { colors } = useTheme();

    const entriesByDate = useMemo(() => {
        return entries.reduce<Record<string, number>>((acc, entry) => {
            const date = entry.createdAt.slice(0, 10);

            acc[date] = (acc[date] ?? 0) + 1;

            return acc;
        }, {});
    }, [entries]);
    return (
        <Calendar
            firstDay={1}
            theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
            }}

            dayComponent={({ date, state }) => {
                if (!date) {
                    return null;
                }

                const count = entriesByDate[date.dateString] ?? 0;
                const isSelected = selectedDate === date.dateString;

                return (
                    <TouchableOpacity
                        style={styles.dayWrapper}
                        onPress={() => setSelectedDate(date.dateString)}
                        activeOpacity={0.7}
                    >
                        <View
                            style={[
                                styles.day,
                                isSelected && {
                                    backgroundColor: colors.accent,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    { color: colors.text },
                                    state === 'disabled' && {
                                        color: colors.placeholder,
                                    },
                                    isSelected && styles.selectedDayText,
                                    isSelected && { color: colors.sheet },
                                ]}
                            >
                                {date.day}
                            </Text>

                            {count > 0 && (
                                <View
                                    style={[
                                        styles.countBadge,
                                        { backgroundColor: colors.badge },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            { color: colors.sheet },
                                            styles.countText,
                                        ]}
                                    >
                                        {count}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    dayWrapper: {
        width: 46,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
    },

    day: {
        width: 40,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 15,
        fontWeight: '500',
    },
    selectedDayText: {
        fontWeight: '700',
    },
    countBadge: {
        position: 'absolute',
        top: -3,
        right: -3,

        minWidth: 17,
        height: 17,
        paddingHorizontal: 4,

        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countText: {
        fontSize: 10,
        fontWeight: '700',
    },
});
