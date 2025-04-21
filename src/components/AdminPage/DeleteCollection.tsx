import { Alert, Text, TouchableOpacity } from "react-native";
import { styles } from "../../screens/styles.ts";

interface DeleteCollectionProps {
    id: number;
    onConfirm: (id: number) => void;
}

export const DeleteCollection = ({id, onConfirm}: DeleteCollectionProps) => {
    const handleDelete = () => {
        Alert.alert(
            "Підтвердження видалення",
            "Ви впевнені, що хочете видалити цю колекцію?",
            [
                {
                    text: "Скасувати",
                    style: "cancel"
                },
                {
                    text: "Видалити",
                    onPress: () => onConfirm(id),
                    style: "destructive"
                }
            ]
        );
    };


    return (
        <TouchableOpacity style={styles.smallButton} onPress={handleDelete}>
            <Text style={styles.title}>Видалити</Text>
        </TouchableOpacity>
    );
}