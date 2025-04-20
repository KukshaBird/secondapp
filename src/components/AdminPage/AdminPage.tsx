import React from "react";
import { Word } from "../../types/word.types.ts";
import { COLORS } from "../../constants";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import WordList from "./WordList.tsx";
import { styles } from "../../screens/styles.ts";

export interface AdminPanelProps {
    data: Word[];
}

export const AdminPanel = ({data} : AdminPanelProps): React.JSX.Element => {

    const handleWordPress = (word: Word) => {
        // TODO: Create WordView and redirect to it;
        console.log('Selected word:', word);
    };

    return (
        <>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <WordList
                    words={data}
                    onWordPress={handleWordPress}
                />
            </SafeAreaView>
        </>
    );
};