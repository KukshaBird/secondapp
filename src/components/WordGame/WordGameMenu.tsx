import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants";
import React, { useEffect, useState } from "react";
import { styles } from "./styles.ts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CardGameStackParamList } from "../../screens/CardGameScreen.tsx";
import { Collection } from "../../types/word.types.ts";
import { useConnectDatabase } from "../../hooks/useConnectDatabase.tsx";
import { CollectionsRepository } from "../../repository/collections.repository.ts";
import CollectionsService from "../../services/collections.service.ts";
import { CollectionSelector } from "./CollectionSelector.tsx";

type WordGameMenuNavigationProp = NativeStackNavigationProp<CardGameStackParamList, 'Menu'>

interface WordGameMenuProp {
    navigation: WordGameMenuNavigationProp
}

export const WordGameMenu = ({navigation}: WordGameMenuProp) => {
    const [selectedCollectionId, setSelectedCollectionId] = useState<number>();
    const [collections, setCollections] = useState<Collection[]>([]);
    const { isConnecting, db } = useConnectDatabase();

    useEffect(() => {
        if (db) {
            const collectionsRepository = new CollectionsRepository(db);
            const collectionsService = new CollectionsService(collectionsRepository)
            const getAllCollections = async () => {
                const items = await collectionsService.getCollections();
                setCollections(items);
            }
            getAllCollections().then();
        }
    }, [db, isConnecting]);

    return <>
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Game', {collectionId: selectedCollectionId})}
                >
                    <Text style={styles.buttonText}>Грати</Text>
                </TouchableOpacity>

                <CollectionSelector
                    collections={collections}
                    selectedId={selectedCollectionId}
                    onSelect={setSelectedCollectionId}
                    navigation={navigation}
                />
            </View>
        </SafeAreaView>
    </>
}
