import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native';
import { ImageUploader } from '../ImageUploader.tsx';
import { CreateWordDto } from '../../types/word.types.ts';
import { COLORS, SPACING } from '../../constants';

interface WordFormProps {
    onSubmit: (values: CreateWordDto) => Promise<void>;
    collections: { id: number; name: string }[];
}

export const WordForm: React.FC<WordFormProps> = ({ onSubmit, collections }) => {
    const [word, setWord] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            setError(null);
            setLoading(true);

            if (!word.trim()) {
                throw new Error('Word is required');
            }

            if (!imageUri) {
                throw new Error('Image is required');
            }

            const wordData = {
                word: word.trim().toLowerCase(),
                img: imageUri,
                collectionIds: selectedCollections,
            };

            await onSubmit(wordData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save word');
        } finally {
            setLoading(false);
        }
    };

    const toggleCollection = (collectionId: number) => {
        setSelectedCollections(prev =>
            prev.includes(collectionId)
                ? prev.filter(id => id !== collectionId)
                : [...prev, collectionId]
        );
    };

    const handleUploadImage = async (imgPath: string) => {
        setImageUri(imgPath);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={word}
                onChangeText={setWord}
                placeholder="Enter word"
                placeholderTextColor={COLORS.darkText}
            />

            <ImageUploader
                value={imageUri}
                onChange={handleUploadImage}
                size={200}
            />

            <View style={styles.collectionsContainer}>
                <Text style={styles.sectionTitle}>Collections:</Text>
                <View style={styles.collectionsGrid}>
                    {collections.map(collection => (
                        <TouchableOpacity
                            key={collection.id}
                            style={[
                                styles.collectionChip,
                                selectedCollections.includes(collection.id) && styles.selectedChip,
                            ]}
                            onPress={() => toggleCollection(collection.id)}
                        >
                            <Text
                                style={[
                                    styles.chipText,
                                    selectedCollections.includes(collection.id) && styles.selectedChipText,
                                ]}
                            >
                                {collection.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.submitButtonText}>Create Word</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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