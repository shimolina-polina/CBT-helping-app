import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = ['#01005B', '#2422AC', '#8E32CF'] as const;
const LOCATIONS = [0, 0.82, 1] as const;

export const GradientButton = ({
    text,
    onPress,
    style,
}: {
    text: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.wrapper,
                style,
                { opacity: pressed ? 0.85 : 1 },
            ]}
        >
            <LinearGradient
                colors={COLORS}
                locations={LOCATIONS}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.gradient}
            >
                <Text style={styles.text}>{text}</Text>
            </LinearGradient>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    wrapper: { borderRadius: 24, overflow: 'hidden', userSelect: 'none' },
    gradient: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
