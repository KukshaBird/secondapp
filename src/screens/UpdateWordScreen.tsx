import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { Collection, UpdateWordDto } from "../types/word.types.ts";
import { COLORS } from "../constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WordsRepository } from "../repository/words.repository.ts";
import WordsService from "../services/words.service.ts";
import { styles } from "./styles.ts";
import { WordForm } from "../components/AdminPage";
import ImagePersistorService from "../services/ImagePersistor.service.ts";
import { useConnectDatabase } from "../hooks/useConnectDatabase.tsx";
import { AdminStackParamList } from "./AdminPanelScreen.tsx";
import { CollectionsRepository } from "../repository/collections.repository.ts";
import CollectionsService from "../services/collections.service.ts";

type UpdateWordScreenProps = NativeStackScreenProps<AdminStackParamList, 'UpdateWord'>

export const UpdateWordScreen = ({ navigation, route }: UpdateWordScreenProps) => {
    const { word } = route.params;
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

    const handleSubmit = async (values: UpdateWordDto) => {

        let path = word.img;
        if (values.img && word.img !== values.img) {
            // Delete the old image if image changed
            await persistor.deleteImage(word.img);
            // Persist (copy) img from values img path;
            path = await persistor.saveImage(values.img, values.word || word.word);
        }

        // Update values;
        const newValues: UpdateWordDto = {
            word: values.word,
            img: path,
            collectionIds: values.collectionIds,
        }

        // Save word
        if (db) {
            const wordsRepository = new WordsRepository(db);
            const wordService = new WordsService(wordsRepository);
            const createWord = async () => {
                await wordService.update(word.id, newValues);
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
                    <Text style={styles.title}>Оновити картку</Text>
                </View>
                <View>
                    <WordForm onSubmit={handleSubmit} collections={collections} wordData={{
                        ...word,
                        collectionIds: word.collections?.map((w) => w.id) || []
                    }} />
                </View>
            </SafeAreaView>
        </>
    )
};
