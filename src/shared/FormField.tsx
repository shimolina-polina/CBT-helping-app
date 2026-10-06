import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

type Props = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
};

export function FormField({ label, value, onChangeText }: Props) {
    const { colors, isDark } = useTheme();
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={label}
            placeholderTextColor={colors.placeholder}
            keyboardAppearance={isDark ? 'dark' : 'light'}
            multiline
            textAlignVertical="top"
            style={[
                styles.input,
                { borderColor: colors.borderStrong, color: colors.text },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 124,
        paddingHorizontal: 14,
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 28,
        borderWidth: 1,
        fontSize: 16,
    },
});
