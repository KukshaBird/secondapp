import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
} from 'react-native';
import { styles } from "./styles.ts";
import { useConnectDatabase } from "../hooks/useConnectDatabase.tsx";
import { AdminStackParamList } from "./AdminPanelScreen.tsx";
import { CreateCollectionDto } from "../types/collections.types.ts";
import { CollectionsRepository } from "../repository/collections.repository.ts";
import CollectionsService from "../services/collections.service.ts";
import { CollectionForm } from "../components/AdminPage/CollectionForm.tsx";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const CollectionFormScreen = () => {
    const navigation = useNavigation<NavigationProp<AdminStackParamList>>()
    const { db, isConnecting } = useConnectDatabase();

    const handleSubmit = async (data: CreateCollectionDto) => {
        if (db) {
            const collectionsRepository = new CollectionsRepository(db);
            const collectionsService = new CollectionsService(collectionsRepository)
            await collectionsService.create(data);
            navigation.navigate('Collections')
        }
    }

    if (isConnecting) {
        return <Text>Connecting...</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <CollectionForm onSubmit={handleSubmit}/>
            </View>
        </SafeAreaView>
    )
};
