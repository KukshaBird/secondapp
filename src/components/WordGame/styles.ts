import { StyleSheet } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.primary,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.md,
        paddingHorizontal: SPACING.md,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    title: {
        fontSize: TYPOGRAPHY.fontSizes.xxxl,
        fontWeight: TYPOGRAPHY.fontWeights.bold,
        textAlign: 'center',
        color: 'white',
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: TYPOGRAPHY.fontSizes.md,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.8)',
    },
    progressContainer: {
        padding: SPACING.md,
        alignItems: 'center',
    },
    progressText: {
        color: COLORS.lightText,
        fontSize: TYPOGRAPHY.fontSizes.sm,
        fontWeight: TYPOGRAPHY.fontWeights.medium,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.lg,
        padding: SPACING.lg,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.lg,
        paddingHorizontal: SPACING.xl,
        borderRadius: 12,
        width: '100%',
        maxWidth: 300,
        elevation: 3,
    },
    smallButton: {
        backgroundColor: COLORS.primary,
        marginVertical: SPACING.sm,
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        borderRadius: 12,
        width: '100%',
        maxWidth: 200,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: TYPOGRAPHY.fontSizes.xl,
        fontWeight: TYPOGRAPHY.fontWeights.bold,
        textAlign: 'center',
    }
});