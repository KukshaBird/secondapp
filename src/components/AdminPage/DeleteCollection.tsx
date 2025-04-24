import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants";

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
            <Text style={styles.buttonText}>Видалити</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontWeight: TYPOGRAPHY.fontWeights.medium,
        fontSize: TYPOGRAPHY.fontSizes.sm,
        textAlign: 'center',
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
});
