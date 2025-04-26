import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native';
import { ImageUploader } from '../ImageUploader.tsx';
import { CreateWordDto, UpdateWordDto } from '../../types/word.types.ts';
import { COLORS } from '../../constants';
import { styles } from "./styles.ts";

interface WordFormProps {
    onSubmit: (values: CreateWordDto) => Promise<void>;
    wordData?: UpdateWordDto;
    collections: { id: number; name: string }[];
}

export const WordForm: React.FC<WordFormProps> = ({ onSubmit, collections, wordData }) => {
    const [word, setWord] = useState(wordData?.word || '');
    const [imageUri, setImageUri] = useState(wordData?.img || '');
    const [selectedCollections, setSelectedCollections] = useState<number[]>(wordData?.collectionIds || []);
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
                placeholder="Введіть слово"
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
                    <Text style={styles.submitButtonText}>{wordData ? 'Оновити' : 'Створити'}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};