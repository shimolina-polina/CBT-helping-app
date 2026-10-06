import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/use-theme';

type Props = {
    left?: ReactNode;
    right?: ReactNode;
    children: ReactNode;
};

export function ScreenShell({ left, right, children }: Props) {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    return (
        <LinearGradient colors={colors.headerGradient} style={styles.root}>
            <View style={[styles.header, { marginTop: insets.top }]}>
                {left ?? <View />}
                {right}
            </View>

            <View
                style={[
                    styles.sheet,
                    {
                        backgroundColor: colors.sheet,
                        paddingBottom: Math.max(insets.bottom, 20),
                    },
                ]}
            >
                {children}
            </View>
        </LinearGradient>
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
});
