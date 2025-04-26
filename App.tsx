/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import { AdminStack } from './src/screens/AdminPanelScreen';
import CardGameScreen from './src/screens/CardGameScreen.tsx';
import { COLORS } from "./src/constants";
import { StatusBar } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Admin: undefined;
  CardGame: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: 'Home',
  screenOptions: {
    headerStyle: { backgroundColor: COLORS.primary },
    headerTintColor: COLORS.white
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Головне Меню'
      }
    },
    Admin: {
      screen: AdminStack,
      options: {
        title: 'Панель управління',
      },
    },
    CardGame: {
      screen: CardGameScreen,
      options: {
        title: 'Збери слово'
      }
    },
  }
});

const Navigation = createStaticNavigation(Stack)

function App(): React.JSX.Element {
  // TODO:
  //  - Create client for requests
  //  - Create class for s3 data upload

  return <>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Navigation />
    </>


}

export default App;
