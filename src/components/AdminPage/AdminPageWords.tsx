import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants";
import { styles } from "../../screens/styles.ts";
import WordList from "./WordList.tsx";
import React, { useEffect, useState } from "react";
import { Word } from "../../types/word.types.ts";
import { useConnectDatabase } from "../../hooks/useConnectDatabase.tsx";
import { WordsRepository } from "../../repository/words.repository.ts";
import WordsService from "../../services/words.service.ts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../screens/AdminPanelScreen.tsx";

type AdminPanelScreenNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'Words'>;

interface AdminPageWordsProps {
    navigation: AdminPanelScreenNavigationProp;
}

export const AdminPageWords = ({ navigation }: AdminPageWordsProps) => {
    const [words, setWords] = useState<Word[]>([]);
    const { isConnecting, db } = useConnectDatabase();

    useEffect(() => {
        if (db) {
            const wordsRepository = new WordsRepository(db);
            const wordService = new WordsService(wordsRepository)
            const getAllWords = async () => {
                const words = await wordService.getWords();
                setWords(words);
            }
            getAllWords().then();
        }
    }, [db, isConnecting]);

    const handleWordPress = (word: Word) => {
        // TODO: Create WordView and redirect to it;
        console.log('Selected word:', word);
    };

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
                <TouchableOpacity
                    style={styles.smallButton}
                    onPress={() => navigation.navigate('WordForm')}
                >
                    <Text style={styles.buttonText}>Створити Картку</Text>
                </TouchableOpacity>

                <WordList
                    words={words}
                    onWordPress={handleWordPress}
                />
            </SafeAreaView>
        </>
    );
}
