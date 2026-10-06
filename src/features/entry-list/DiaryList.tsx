import { FlatList, StyleSheet, View, Text } from 'react-native';
import { DiaryListItem } from '../entry-item/DiaryListItem';
import { Entry } from '@/types/Entries';
import { useRouter } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';
import { useTheme } from '@/hooks/use-theme';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
    data: Entry[];
    deleteMode?: boolean;
    setDeleteMode?: (value: boolean) => void;
    setSelectedItems?: Dispatch<SetStateAction<Entry[]>>;
    selectedItems?: Entry[];
};

export function DiaryList({
    data,
    deleteMode,
    setDeleteMode,
    setSelectedItems,
    selectedItems,
}: Props) {
    const router = useRouter();
    const handleItemPress = (item: Entry) => {
        router.push({
            pathname: '/create-entry',
            params: {
                id: item.id,
            },
        });
    };

    const handleItemSelect = (item: Entry) => {
        setSelectedItems?.((prev) => {
            if (prev.includes(item)) {
                if (
                    prev.filter((curItem) => curItem.id !== item.id).length ===
                    0
                )
                    setDeleteMode?.(false);
                return prev.filter((curItem) => curItem.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <DiaryListItem
                    item={item}
                    onPress={() =>
                        deleteMode
                            ? handleItemSelect(item)
                            : handleItemPress(item)
                    }
                    onLongPress={(item) => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        setDeleteMode?.(true);
                        setSelectedItems?.([item]);
                    }}
                    isSelected={selectedItems?.includes(item) ?? false}
                />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyState />}
        />
    );
}

const styles = StyleSheet.create({
    content: { paddingTop: 22 },
    separator: { height: 12 },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingVertical: 48,
    },

    iconContainer: {
        width: 84,
        height: 84,
        borderRadius: 42,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },

    description: {
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
        maxWidth: 280,
    },
});

const EmptyState = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.wrapper}>
            <View
                style={[styles.iconContainer, { backgroundColor: colors.card }]}
            >
                <MaterialCommunityIcons
                    name="notebook-edit-outline"
                    size={42}
                    color={colors.accent}
                />
            </View>

            <Text style={[styles.title, { color: colors.text }]}>
                Записей пока нет
            </Text>

            <Text style={[styles.description, { color: colors.textSecondary }]}>
                Здесь будут ваши записи из дневника
            </Text>
        </View>
    );
};
