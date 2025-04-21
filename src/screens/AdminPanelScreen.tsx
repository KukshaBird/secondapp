import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminPageWords, AdminPanel } from "../components/AdminPage";
import { AdminPageCollections } from "../components/AdminPage/AdminPageCollections.tsx";
import { WordFormScreen } from "./CreateWordScreen.tsx";
import { CollectionFormScreen } from "./CreateCollectionScreen.tsx";

export type AdminStackParamList = {
    Panel: undefined;
    Words: undefined;
    WordForm: undefined;
    Collections: undefined;
    CollectionForm: undefined;
}

const AdminStack = createNativeStackNavigator<AdminStackParamList>({
    screens: {
        Panel: AdminPanel,
        Words: AdminPageWords,
        Collections: AdminPageCollections,
        WordForm: WordFormScreen,
        CollectionForm: CollectionFormScreen,
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
            <AdminStack.Screen name="CollectionForm" component={CollectionFormScreen} />
        </AdminStack.Navigator>

};

export default AdminPanelScreen;