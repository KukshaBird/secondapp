import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StatusBar,
} from 'react-native';
import { COLORS } from '../constants';
import { CreateWordDto, Word } from "../types/word.types.ts";
import ImagePersistorService from "../services/ImagePersistor.service.ts";
import { useConnectDatabase } from "../hooks/useConnectDatabase.tsx";
import WordsService from "../services/words.service.ts";
import { WordsRepository } from "../repository/words.repository.ts";
import { styles } from "./styles.ts";


const AdminPanelScreen = (): React.JSX.Element => {
    const persistor = new ImagePersistorService();
    // Current word-image pair index
    const [data, setData] = useState<Word[]>([]);

    const { isConnecting, db } = useConnectDatabase();


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
                const newWord = await wordService.create(newValues);
                setData([...data, newWord]);
            }
            createWord().then();
        }
    }

    useEffect(() => {
        // Initialize the image persistor
        persistor.ensureInitialized().catch(console.error);
    }, []);


    useEffect(() => {
        if (db) {
            const wordsRepository = new WordsRepository(db);
            const wordService = new WordsService(wordsRepository)
            const getAllWords = async () => {
                const words = await wordService.getWords();
                console.log(words);
                setData(words);
            }
            getAllWords().then();
        }
    }, [db, isConnecting]);

    if (isConnecting) {
        return <Text>Connecting...</Text>;
    }

    return (
        <>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Управління картками</Text>
                </View>
            </SafeAreaView>
        </>
    );
};

export default AdminPanelScreen;