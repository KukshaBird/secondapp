import React from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { COLORS } from "../constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles.ts";
import { useConnectDatabase } from "../hooks/useConnectDatabase.tsx";
import { AdminStackParamList } from "./AdminPanelScreen.tsx";
import { CreateCollectionDto } from "../types/collections.types.ts";
import { CollectionsRepository } from "../repository/collections.repository.ts";
import CollectionsService from "../services/collections.service.ts";
import { CollectionForm } from "../components/AdminPage/CollectionForm.tsx";

type CreateCollectionScreenNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'CollectionForm'>;

interface CollectionFormProps {
    navigation: CreateCollectionScreenNavigationProp
}

export const CollectionFormScreen = ({ navigation }: CollectionFormProps) => {
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
        <>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Створити нову колекцію</Text>
                </View>
                <View>
                    <CollectionForm onSubmit={handleSubmit}/>
                </View>
            </SafeAreaView>
        </>
    )
};
