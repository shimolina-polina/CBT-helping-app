import { Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { useTheme } from '@/hooks/use-theme';

type Props = {
    icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
    onPress: () => void;
};

export function RoundIconButton({ icon, onPress }: Props) {
    const { colors } = useTheme();

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.btn,
                { backgroundColor: colors.iconButtonBg },
                pressed && { opacity: 0.8 },
            ]}
        >
            <MaterialCommunityIcons
                name={icon}
                size={22}
                color={colors.iconButtonIcon}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
