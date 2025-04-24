import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
import { styles } from "../../screens/styles.ts";
import { Collection } from "../../types/word.types.ts";
import { CollectionList } from "./CollectionList.tsx";
import { useConnectDatabase } from "../../hooks/useConnectDatabase.tsx";
import CollectionsService from "../../services/collections.service.ts";
import { CollectionsRepository } from "../../repository/collections.repository.ts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../screens/AdminPanelScreen.tsx";


type AdminPanelScreenNavigationProp = NativeStackNavigationProp<AdminStackParamList, 'Collections'>;

interface AdminPageCollectionsProps {
    navigation: AdminPanelScreenNavigationProp
}

export const AdminPageCollections = ({ navigation }: AdminPageCollectionsProps) => {
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

    const handleDelete = (id: number) => {
        if (db) {
            const collectionsRepository = new CollectionsRepository(db);
            const collectionsService = new CollectionsService(collectionsRepository);
            collectionsService.delete(id).then(() => {
                const newCollections = collections.filter(c => c.id !== id);
                setCollections(newCollections);
            });
        }
    }

    const handleEdit = (data: Collection) => {
        const {id, ...rest} = data
        navigation.navigate('UpdateForm', {collectionId: id, collection: rest})
    }

    return (
        <>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={styles.smallButton}
                    onPress={() => navigation.navigate('CollectionForm')}
                >
                    <Text style={styles.buttonText}>Створити Колекцію</Text>
                </TouchableOpacity>
                <CollectionList data={collections} onDelete={handleDelete} onEdit={handleEdit} />
            </SafeAreaView>
        </>
    );
}