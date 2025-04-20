import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StatusBar, TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants';
import { Word } from "../types/word.types.ts";
import { useConnectDatabase } from "../hooks/useConnectDatabase.tsx";
import WordsService from "../services/words.service.ts";
import { WordsRepository } from "../repository/words.repository.ts";
import { styles } from "./styles.ts";
import { AdminPanel } from "../components/AdminPage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App.tsx";

type AdminPanelScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Admin'>;

interface Props {
    navigation: AdminPanelScreenNavigationProp;
}

const AdminPanelScreen = ({navigation}: Props): React.JSX.Element => {
    const [data, setData] = useState<Word[]>([]);
    const { isConnecting, db } = useConnectDatabase();

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
                    <Text style={styles.title}>Управління картками</Text>
                </View>
                <TouchableOpacity
                    style={styles.smallButton}
                    onPress={() => navigation.navigate('WordForm')}
                >
                    <Text style={styles.buttonText}>Створити Картку</Text>
                </TouchableOpacity>

                {data.length > 0 ? <AdminPanel data={data} /> : <Text>No data available</Text>}
            </SafeAreaView>
        </>
    );
};

export default AdminPanelScreen;