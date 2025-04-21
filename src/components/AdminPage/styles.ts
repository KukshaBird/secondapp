import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        padding: SPACING.md,
        gap: SPACING.md,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        padding: SPACING.sm,
        fontSize: 16,
        color: COLORS.lightText,
    },
    collectionsContainer: {
        gap: SPACING.sm,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.lightText,
    },
    collectionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.xs,
    },
    collectionChip: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: 16,
        backgroundColor: COLORS.lightText,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectedChip: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    chipText: {
        color: COLORS.darkText,
    },
    selectedChipText: {
        color: 'white',
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        padding: SPACING.sm,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: COLORS.error,
    },
});