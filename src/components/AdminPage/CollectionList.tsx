import { Collection } from "../../types/word.types.ts";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { DeleteCollection } from "./DeleteCollection.tsx";

interface CollectionListProps {
    data: Collection[];
    onDelete: (id: number) => void;
}

export const CollectionList = ({data, onDelete}: CollectionListProps) => {
    const renderItem = ({ item }: { item: Collection }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.buttonsContainer}>
                {/* Edit button placeholder */}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    name: {
        flex: 1,
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 8, // Note: gap might not work on older React Native versions
    }
});
