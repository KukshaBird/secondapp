import React from 'react';
import {
    View,
    Text,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { COLORS } from "../constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styles } from "./styles.ts";
import { useConnectDatabase } from "../hooks/useConnectDatabase.tsx";
import { AdminStackParamList } from "./AdminPanelScreen.tsx";
import { UpdateCollectionDto } from "../types/collections.types.ts";
import { CollectionsRepository } from "../repository/collections.repository.ts";
import CollectionsService from "../services/collections.service.ts";
import { CollectionForm } from "../components/AdminPage/CollectionForm.tsx";

type UpdateCollectionFormScreenProp = NativeStackScreenProps<AdminStackParamList, 'UpdateForm'>;

export const UpdateCollectionScreen = ({ navigation, route }: UpdateCollectionFormScreenProp) => {
    const { collectionId, collection } = route.params;
    const { db, isConnecting } = useConnectDatabase();

    const handleSubmit = async (data: UpdateCollectionDto) => {
        if (db) {
            const collectionsRepository = new CollectionsRepository(db);
            const collectionsService = new CollectionsService(collectionsRepository)
            await collectionsService.update(collectionId, data);
            navigation.navigate('Collections');
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
                    <Text style={styles.title}>Оновити</Text>
                </View>
                <View>
                    <CollectionForm onSubmit={handleSubmit} collection={collection}/>
                </View>
            </SafeAreaView>
        </>
    )
};
