import { ScrollView, StyleSheet, Text } from 'react-native';
import { SmerItem, SmerSection } from '@/features/help/SmerSection';
import { useTheme } from '@/hooks/use-theme';

const SECTIONS: SmerItem[] = [
    {
        letter: 'С',
        title: 'Ситуация',
        question: 'Что произошло?',
        description:
            'Опишите событие: где, когда и с кем. Только факты, так, как их записала бы камера, без оценок и догадок о чужих намерениях.',
        example:
            '«На планёрке руководитель не прокомментировал мой отчёт».\nНе так: «Меня проигнорировали».',
    },
    {
        letter: 'М',
        title: 'Мысли',
        question: 'О чём я подумала в тот момент?',
        description:
            'Запишите мысли, которые пронеслись в голове, как есть, не исправляя и не споря с ними. Часто они короткие и появляются автоматически.',
        example: '«Он недоволен. Я всё сделала плохо. Меня уволят».',
    },
    {
        letter: 'Э',
        title: 'Эмоции',
        question: 'Что я почувствовала?',
        description:
            'Назовите эмоцию одним-двумя словами: тревога, обида, стыд, злость, грусть. Можно добавить силу от 0 до 100%. Не путайте с мыслью: «я никому не нужна» — мысль, а «грусть» — эмоция.',
        example: 'Тревога 70%, стыд 40%.',
    },
    {
        letter: 'Р',
        title: 'Реакции',
        question: 'Что я сделала и что было в теле?',
        description:
            'Опишите своё поведение и ощущения в теле: что вы сделали, чего избегали, как изменились дыхание, пульс, напряжение.',
        example:
            'Замолчала, весь день проверяла почту, сжалось в груди, не могла сосредоточиться.',
    },
];

export const HelpData = () => {
    const { colors } = useTheme();

    return (
        <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[styles.h1, { color: colors.accent }]}>
                Как заполнять дневник СМЭР
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
                Дневник помогает заметить связь между тем, что произошло, что вы
                об этом подумали, что почувствовали и как поступили. Заполняйте
                его в тот же день, пока всё свежо. Правильных и неправильных
                ответов нет, пишите коротко и честно.
            </Text>

            {SECTIONS.map((item) => (
                <SmerSection key={item.letter} item={item} />
            ))}

            <Text style={[styles.tipTitle, { color: colors.text }]}>
                Если сложно
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
                Начните с эмоции, а потом вернитесь к ситуации и мыслям. Со
                временем вы начнёте замечать повторяющиеся мысли и то, как они
                влияют на самочувствие.
            </Text>

            <Text style={[styles.note, { color: colors.textSecondary }]}>
                Дневник — инструмент самонаблюдения и не заменяет помощь
                специалиста.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    content: { paddingTop: 24, paddingBottom: 12, gap: 16 },
    h1: { fontSize: 24, fontWeight: '700' },
    paragraph: { fontSize: 15, lineHeight: 22 },
    tipTitle: { fontSize: 18, fontWeight: '600', marginTop: 4 },
    note: { fontSize: 13, lineHeight: 18 },
});
