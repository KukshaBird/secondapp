import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminPageWords, AdminPanel } from "../components/AdminPage";
import { AdminPageCollections } from "../components/AdminPage/AdminPageCollections.tsx";
import { WordFormScreen } from "./CreateWordScreen.tsx";
import { CollectionFormScreen } from "./CreateCollectionScreen.tsx";
import { UpdateCollectionScreen } from "./UpdateCollectionScreen.tsx";
import { UpdateCollectionDto } from "../types/collections.types.ts";
import { UpdateWordScreen } from "./UpdateWordScreen.tsx";
import { Word } from "../types/word.types.ts";

export type AdminStackParamList = {
    Panel: undefined;
    Words: undefined;
    WordForm: undefined;
    UpdateWord: { word: Word };
    Collections: undefined;
    CollectionForm: undefined;
    UpdateForm: { collectionId: number, collection: UpdateCollectionDto};
}

const AdminStack = createNativeStackNavigator<AdminStackParamList>({
    screens: {
        Panel: AdminPanel,
        Words: AdminPageWords,
        Collections: AdminPageCollections,
        WordForm: WordFormScreen,
        UpdateWord: UpdateWordScreen,
        CollectionForm: CollectionFormScreen,
        UpdateForm: UpdateCollectionScreen,
    },
});

const AdminPanelScreen = (): React.JSX.Element => {
    return <AdminStack.Navigator
            initialRouteName="Panel"
            screenOptions={{
                headerShown: false
            }}
        >
            <AdminStack.Screen name="Panel" component={AdminPanel} />
            <AdminStack.Screen name="Words" component={AdminPageWords} />
            <AdminStack.Screen name="Collections" component={AdminPageCollections} />
            <AdminStack.Screen name="WordForm" component={WordFormScreen} />
            <AdminStack.Screen name="UpdateWord" component={UpdateWordScreen} />
            <AdminStack.Screen name="CollectionForm" component={CollectionFormScreen} />
            <AdminStack.Screen name="UpdateForm" component={UpdateCollectionScreen} />
        </AdminStack.Navigator>

};

export default AdminPanelScreen;