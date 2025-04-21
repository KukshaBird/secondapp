import React, { useState } from 'react';
import {
    View,
    TextInput,
} from 'react-native';
import { COLORS } from '../../constants';
import { CreateCollectionDto } from "../../types/collections.types.ts";
import { styles } from "./styles.ts";

interface CollectionFormProps {
    onSubmit: (values: CreateCollectionDto) => Promise<void>;
}

export const CollectionForm: React.FC<CollectionFormProps> = () => {
    const [name, setName] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter word"
                placeholderTextColor={COLORS.darkText}
            />
        </View>
    );
};

