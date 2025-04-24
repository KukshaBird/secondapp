import { Collection } from "../../types/word.types.ts";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DeleteCollection } from "./DeleteCollection.tsx";
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants";

interface CollectionListProps {
    data: Collection[];
    onDelete: (id: number) => void;
    onEdit: (collection: Collection) => void;
}

export const CollectionList = ({data, onDelete, onEdit}: CollectionListProps) => {
    const renderItem = ({ item }: { item: Collection }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.smallButton} onPress={() => onEdit(item) } >
                    <Text style={styles.title}>Редагувати</Text>
                </TouchableOpacity>
                <DeleteCollection id={item.id} onConfirm={onDelete} />
            </View>
        </View>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );

}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    name: {
        flex: 1,
        fontSize: 24,
        color: COLORS.darkText,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 8, // Note: gap might not work on older React Native versions
    },
    smallButton: {
        backgroundColor: COLORS.primaryDark,
        marginVertical: SPACING.xs,
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.xs,
        borderRadius: 12,
        width: '100%',
        maxWidth: 100,
        elevation: 3,
    },
    title: {
        fontSize: TYPOGRAPHY.fontSizes.sm,
        fontWeight: TYPOGRAPHY.fontWeights.bold,
        textAlign: 'center',
        color: 'white',
        marginBottom: SPACING.xs,
    },
});
