import React, { useState } from 'react';
import {
    View,
    TextInput, ActivityIndicator, Text, TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../constants';
import { CreateCollectionDto, UpdateCollectionDto } from "../../types/collections.types.ts";
import { styles } from "./styles.ts";

interface CollectionFormProps {
    onSubmit: (values: CreateCollectionDto) => Promise<void>;
    collection?: UpdateCollectionDto;
}

export const CollectionForm: React.FC<CollectionFormProps> = ({ onSubmit, collection }) => {
    const [name, setName] = useState(collection?.name || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            setError(null);
            setLoading(true);

            if (!name.trim()) {
                throw new Error('Name is required');
            }

            const data: CreateCollectionDto = {
                name: name.trim().toLowerCase(),
            }

            await onSubmit(data);
        }catch (error: any) {
            setError(error instanceof Error ? error.message : 'Failed to save word');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter word"
                placeholderTextColor={COLORS.darkText}
            />

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
                    <Text style={styles.submitButtonText}>{collection ? 'Оновити' : 'Створити' }</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

