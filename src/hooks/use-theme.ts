import { darkColors, lightColors } from '@/constants/colors';
import { useColorScheme } from 'react-native';

export function useTheme() {
    const isDark = useColorScheme() === 'dark';
    return { isDark, colors: isDark ? darkColors : lightColors };
}
