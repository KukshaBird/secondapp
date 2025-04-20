import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Alert,
    StatusBar,
} from 'react-native';
import { WordGame, DifficultySelector } from '../components';
import type { Difficulty } from '../components';
import { WORD_IMAGE_PAIRS } from '../constants';
import { COLORS } from '../constants';
import { Word } from "../types/word.types.ts";
import { useConnectDatabase } from "../hooks/useConnectDatabase.tsx";
import WordsService from "../services/words.service.ts";
import { WordsRepository } from "../repository/words.repository.ts";
import { styles } from "./styles.ts";


const WordCardScreen = (): React.JSX.Element => {
    // Current word-image pair index
    const [data, setData] = useState<Word[]>([]);
    const [currentPairIndex, setCurrentPairIndex] = useState<number>(0);
    const currentPair = data[currentPairIndex];

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
        const nextIndex = (currentPairIndex + 1) % WORD_IMAGE_PAIRS.length;
        setCurrentPairIndex(nextIndex);

        // If we've completed all pairs, show a congratulations message
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
                const words = await wordService.getWords();
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
                        Word {currentPairIndex + 1} of {WORD_IMAGE_PAIRS.length}
                    </Text>
                </View>
            </SafeAreaView>
        </>
    );
};

export default WordCardScreen;