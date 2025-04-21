import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { Collection, CreateWordDto, Word } from "../types/word.types.ts";
import { COLORS } from "../constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { WordsRepository } from "../repository/words.repository.ts";
import WordsService from "../services/words.service.ts";
import { styles } from "./styles.ts";
import { WordForm } from "../components/AdminPage";
import ImagePersistorService from "../services/ImagePersistor.service.ts";
import { useConnectDatabase } from "../hooks/useConnectDatabase.tsx";
import { AdminStackParamList } from "./AdminPanelScreen.tsx";
import { CollectionsRepository } from "../repository/collections.repository.ts";
import CollectionsService from "../services/collections.service.ts";

type CreateWordScreenNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'WordForm'>;

interface WordFormProps {
    navigation: CreateWordScreenNavigationProp
}

export const WordFormScreen = ({ navigation }: WordFormProps) => {
    const persistor = new ImagePersistorService();
    const { db, isConnecting } = useConnectDatabase();
    const [collections, setCollections] = useState<Collection[]>([])

    useEffect(() => {
        if (db) {
            const collectionsRepository = new CollectionsRepository(db);
            const collectionsService = new CollectionsService(collectionsRepository);
            const getAllCollections = async () => {
                const items = await collectionsService.getCollections();
                setCollections(items);
            }
            getAllCollections().then();
        }
    }, [db, isConnecting]);

    const handleSubmit = async (values: CreateWordDto) => {
        // Persist (copy) img from values img path;
        const newPath = await persistor.saveImage(values.img, values.word);
        // Update values;
        const newValues: CreateWordDto = {
            word: values.word,
            img: newPath,
            collectionIds: values.collectionIds,
        }

        // Save word
        if (db) {
            const wordsRepository = new WordsRepository(db);
            const wordService = new WordsService(wordsRepository)
            const createWord = async () => {
                await wordService.create(newValues);
                navigation.navigate('Words')
            }
            createWord().then();
        }
    }

    useEffect(() => {
        // Initialize the image persistor
        persistor.ensureInitialized().catch(console.error);
    }, []);

    if (isConnecting) {
        return <Text>Connecting...</Text>;
    }

    return (
        <>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Створити нову картку</Text>
                </View>
                <View>
                    <WordForm onSubmit={handleSubmit} collections={collections} />
                </View>
            </SafeAreaView>
        </>
    )
};
