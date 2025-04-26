import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdminPageWords, AdminPanel } from "../components/AdminPage";
import { AdminPageCollections } from "../components/AdminPage/AdminPageCollections.tsx";
import { WordFormScreen } from "./CreateWordScreen.tsx";
import { CollectionFormScreen } from "./CreateCollectionScreen.tsx";
import { UpdateCollectionScreen } from "./UpdateCollectionScreen.tsx";
import { UpdateCollectionDto } from "../types/collections.types.ts";
import { UpdateWordScreen } from "./UpdateWordScreen.tsx";
import { Word } from "../types/word.types.ts";
import { COLORS } from "../constants";

export type AdminStackParamList = {
    Panel: undefined;
    Words: undefined;
    WordForm: undefined;
    UpdateWord: { word: Word };
    Collections: undefined;
    CollectionForm: undefined;
    UpdateForm: { collectionId: number, collection: UpdateCollectionDto};
}

export const AdminStack = createNativeStackNavigator<AdminStackParamList>({
    screenOptions: {
        headerStyle: { backgroundColor: COLORS.primaryDark },
        headerTintColor: COLORS.white
    },
    screens: {
        Panel: {
            screen: AdminPanel,
            options: {
                headerShown: false
            }
        },
        Words: {
            screen: AdminPageWords,
            options: {
                title: 'Управління картками'
            }
        },
        Collections: {
            screen: AdminPageCollections,
            options: {
                title: 'Управління колекціями'
            }
        },
        WordForm: {
            screen: WordFormScreen,
            options: {
                title: 'Створити картку'
            }
        },
        UpdateWord: {
            screen: UpdateWordScreen,
            options: {
                title: 'Редагувати картку'
            }
        },
        CollectionForm: {
            screen: CollectionFormScreen,
            options: {
                title: 'Створити колекцію'
            }
        },
        UpdateForm: {
            screen: UpdateCollectionScreen,
            options: {
                title: 'Редагувати колекцію'
            }
        },
    },
});