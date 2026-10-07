import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { ScreenShell } from '@/shared/ScreenShell';
import { RoundIconButton } from '@/shared/RoundIconButton';
import { useNavigation, useRouter } from 'expo-router';
import { EditEntry } from '@/features/edit-entry/EditEntry';
import { useEffect } from 'react';

export default function CreateEntryScreen() {
    const router = useRouter();

    return (
        <ScreenShell
            left={
                <RoundIconButton
                    icon="arrow-left"
                    onPress={() => {
                        router.back();
                    }}
                />
            }
            right={
                <RoundIconButton
                    icon="help"
                    onPress={() => router.push('/help')}
                />
            }
        >
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <EditEntry />
            </KeyboardAvoidingView>
        </ScreenShell>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    fields: { paddingTop: 20, gap: 16 },
    save: { marginTop: 20 },
});
