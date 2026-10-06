import { ScreenShell } from '@/shared/ScreenShell';
import { RoundIconButton } from '@/shared/RoundIconButton';
import { useRouter } from 'expo-router';
import { HelpData } from '@/features/help/HelpData';

export default function HelpScreen() {
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
        >
            <HelpData />
        </ScreenShell>
    );
}
