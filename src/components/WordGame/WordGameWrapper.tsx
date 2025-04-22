import React, { useEffect, useState } from "react";
import { Word } from "../../types/word.types.ts";
import { useConnectDatabase } from "../../hooks/useConnectDatabase.tsx";
import type { Difficulty } from "../DifficultySelector.tsx";
import { COLORS } from "../../constants";
import { Alert, SafeAreaView, StatusBar, Text, View } from "react-native";
import { WordsRepository } from "../../repository/words.repository.ts";
import WordsService from "../../services/words.service.ts";
import { styles } from "../../screens/styles.ts";
import { DifficultySelector, WordGame } from "../index.ts";
import { CardGameStackParamList } from "../../screens/CardGameScreen.tsx";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type WordGameWrapperProps = NativeStackScreenProps<CardGameStackParamList, 'Game'>;


export const WordGameWrapper = ({route }: WordGameWrapperProps) => {
    const { collectionId } = route.params;
    // Current word-image pair index
    const [data, setData] = useState<Word[]>([]);
    const [currentPairIndex, setCurrentPairIndex] = useState<number>(0);
    const currentPair = data[currentPairIndex];
    const wordsListLength = data.length;

    const { isConnecting, db } = useConnectDatabase();

    // Difficulty level
    const [difficulty, setDifficulty] = useState<Difficulty>('hard');

    // Handle difficulty change
    const handleDifficultyChange = (newDifficulty: Difficulty): void => {
        setDifficulty(newDifficulty);
    };

    // Handle successful completion of a word
    const handleSuccess = (): void => {
        // Move to the next word-image pair or cycle back to the first one
        const nextIndex = (currentPairIndex + 1) % wordsListLength;
        setCurrentPairIndex(nextIndex);

        // If we've completed all pairs, show a congratulation message
        if (nextIndex === 0) {
            Alert.alert(
                'Congratulations!',
                'You have completed all the words! Let\'s start again.',
                [{ text: 'OK' }]
            );
        }
    };

    useEffect(() => {
        if (db) {
            const wordsRepository = new WordsRepository(db);
            const wordService = new WordsService(wordsRepository)
            const getAllWords = async () => {
                const words = await wordService.getWords(collectionId)
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
                    <Text style={styles.title}>Збери слово</Text>
                </View>

                <DifficultySelector
                    difficulty={difficulty}
                    onDifficultyChange={handleDifficultyChange}
                />

                {currentPair && (
                    <WordGame
                        word={currentPair.word}
                        imagePath={currentPair.img}
                        onSuccess={handleSuccess}
                        difficulty={difficulty}
                    />
                )}

                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>
                        Word {currentPairIndex + 1} of {wordsListLength}
                    </Text>
                </View>
            </SafeAreaView>
        </>
    );
}