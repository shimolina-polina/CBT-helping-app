import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export type SmerItem = {
    letter: string;
    title: string;
    question: string;
    description: string;
    example: string;
};

export function SmerSection({ item }: { item: SmerItem }) {
    const { colors } = useTheme();

    return (
        <View style={[styles.card, { borderColor: colors.border }]}>
            <View style={styles.head}>
                <View style={[styles.badge, { backgroundColor: colors.badge }]}>
                    <Text style={styles.letter}>{item.letter}</Text>
                </View>
                <View style={styles.headText}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {item.title}
                    </Text>
                    <Text
                        style={[
                            styles.question,
                            { color: colors.textSecondary },
                        ]}
                    >
                        {item.question}
                    </Text>
                </View>
            </View>

            <Text style={[styles.description, { color: colors.text }]}>
                {item.description}
            </Text>

            <View style={[styles.example, { backgroundColor: colors.card }]}>
                <Text
                    style={[
                        styles.exampleLabel,
                        { color: colors.textSecondary },
                    ]}
                >
                    Пример
                </Text>
                <Text style={[styles.exampleText, { color: colors.text }]}>
                    {item.example}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 24,
        borderWidth: 1,
        gap: 12,
    },
    head: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    badge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    letter: { fontSize: 22, fontWeight: '600' },
    headText: { flex: 1 },
    title: { fontSize: 18, fontWeight: '600' },
    question: { fontSize: 14, marginTop: 2 },
    description: { fontSize: 15, lineHeight: 22 },
    example: {
        padding: 12,
        borderRadius: 16,
        gap: 4,
    },
    exampleLabel: { fontSize: 12, textTransform: 'uppercase' },
    exampleText: { fontSize: 14, lineHeight: 20 },
});
