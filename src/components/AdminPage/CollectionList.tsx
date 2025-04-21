import { Collection } from "../../types/word.types.ts";
import { FlatList, Text } from "react-native";

interface CollectionListProps {
    data: Collection[];
}

export const CollectionList = ({data}: CollectionListProps) => {
    const renderItem = ({ item }: { item: Collection }) => (
        <Text>{item.name}</Text>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );

}