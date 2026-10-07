import { Pressable, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Entry } from '@/types/Entries';
import { useTheme } from '@/hooks/use-theme';
import { useEffect, useRef } from 'react';
import {formatDate} from "@/utils/formatDateTime";

type Props = {
    item: Entry;
    onPress?: (item: Entry) => void;
    onLongPress?: (item: Entry) => void;
    isSelected: boolean;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function DiaryListItem({
    item,
    onPress,
    onLongPress,
    isSelected,
}: Props) {
    const { colors } = useTheme();
    const rotation = useRef(new Animated.Value(0)).current;

    const rotate = rotation.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-1.5deg', '1.5deg'],
    });

    useEffect(() => {
        if (!isSelected) {
            rotation.stopAnimation();
            rotation.setValue(0);
            return;
        }

        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(rotation, {
                    toValue: 1,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(rotation, {
                    toValue: -1,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]),
        );

        animation.start();

        return () => {
            animation.stop();
            rotation.setValue(0);
        };
    }, [isSelected, rotation]);
    return (
        <Animated.View
            style={{
                transform: [{ rotate }],
            }}
        >
            <Pressable
                onPress={() => onPress?.(item)}
                onLongPress={() => {
                    onLongPress?.(item);
                }}
                style={({ pressed, hovered }) => [
                    styles.container,
                    { borderColor: colors.border },
                    pressed && { opacity: 0.7 },
                    hovered && { opacity: 0.9 },
                    isSelected && { opacity: 0.6 },
                ]}
            >
                <Text
                    style={[styles.text, { color: colors.text }]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {item.situation}
                </Text>
                <Text style={[styles.date, { color: colors.textSecondary }]}>
                    {formatDate(item.createdAt)}
                </Text>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 58,
        paddingHorizontal: 22,
        borderRadius: 29,
        borderWidth: 1,
    },
    text: { flex: 1, fontSize: 18, color: '#000' },
    date: { marginLeft: 8, fontSize: 14, color: '#666' },
});
