import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
} from 'react-native';
import { Collection, CreateWordDto, Word } from "../types/word.types.ts";
import { WordsRepository } from "../repository/words.repository.ts";
import WordsService from "../services/words.service.ts";
import { styles } from "./styles.ts";
import { WordForm } from "../components/AdminPage";
import ImagePersistorService from "../services/ImagePersistor.service.ts";
import { useConnectDatabase } from "../hooks/useConnectDatabase.tsx";
import { CollectionsRepository } from "../repository/collections.repository.ts";
import CollectionsService from "../services/collections.service.ts";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AdminStackParamList } from "./AdminPanelScreen.tsx";

export const WordFormScreen = () => {
    const navigation = useNavigation<NavigationProp<AdminStackParamList>>();
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
            <SafeAreaView style={styles.container}>
                <View>
                    <WordForm onSubmit={handleSubmit} collections={collections} />
                </View>
            </SafeAreaView>
        </>
    )
};
