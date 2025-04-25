import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Text,
} from 'react-native';
import { launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import { COLORS, SPACING } from '../constants';
import { OptionsCommon } from "react-native-image-picker/src/types.ts";

interface ImageUploaderProps {
    value?: string;
    onChange: (imageUri: string) => Promise<void>;
    size?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({value,onChange,size = 200,}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImagePicker = async (type: 'camera' | 'library') => {
        const options: OptionsCommon = {
            mediaType: 'photo' as const,
            maxWidth: 1000,
            maxHeight: 1000,
            quality: 0.8,
        };

        try {
            setLoading(true);
            setError(null);

            const response: ImagePickerResponse = await (type === 'camera'
                ? launchCamera(options)
                : launchImageLibrary(options));

            if (response.errorCode) {
                throw new Error(response.errorMessage);
            }

            if (response.assets && response.assets[0]?.uri) {
                await onChange(response.assets[0].uri);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to pick image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => handleImagePicker('library')}
                style={[styles.imageContainer, { width: size, height: size }]}
            >
                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : value ? (
                    <Image
                        source={{ uri: value.startsWith('http') ? value : `file://${value}` }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>Tap to select image</Text>
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.libraryButton]}
                    onPress={() => handleImagePicker('library')}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>Choose from Library</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.cameraButton]}
                    onPress={() => handleImagePicker('camera')}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>Take Photo</Text>
                </TouchableOpacity>
            </View>

            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: SPACING.sm,
    },
    imageContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: COLORS.secondaryDark,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        padding: SPACING.md,
        alignItems: 'center',
    },
    placeholderText: {
        color: COLORS.darkText,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    button: {
        padding: SPACING.sm,
        borderRadius: 8,
        minWidth: 120,
    },
    libraryButton: {
        backgroundColor: COLORS.primary,
    },
    cameraButton: {
        backgroundColor: COLORS.secondary,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
    errorText: {
        color: COLORS.error,
        marginTop: SPACING.xs,
    },
});