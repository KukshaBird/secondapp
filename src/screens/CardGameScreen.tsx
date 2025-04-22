import React from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WordGameMenu, WordGameWrapper } from "../components/WordGame";

export type CardGameStackParamList = {
    Menu: undefined;
    Game: {collectionId?: number};
}

const CardGameStack = createNativeStackNavigator<CardGameStackParamList>({
    screens: {
        Menu: WordGameMenu,
        Game: WordGameWrapper
    },
});

const CardGameScreen = (): React.JSX.Element => {

    return <CardGameStack.Navigator
        initialRouteName="Menu"
        screenOptions={{
            headerShown: false
        }}
    >
        <CardGameStack.Screen name="Menu" component={WordGameMenu} />
        <CardGameStack.Screen name="Game" component={WordGameWrapper} />
    </CardGameStack.Navigator>
};

export default CardGameScreen;