/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AdminPanelScreen from './src/screens/AdminPanelScreen';
import WordCardScreen from './src/screens/WordCardScreen';
import { WordFormScreen } from "./src/screens/CreateWordScreen.tsx";

export type RootStackParamList = {
  Home: undefined;
  Admin: undefined;
  WordCard: undefined;
  WordForm: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  // TODO:
  //  - Create client for requests
  //  - Create class for s3 data upload
  //  - Create default seeds for init db
  //  - Handle small collections
  //  - Add MenuScreen
  //  - Create Admin component
  //  - Add Collections selector

  return <NavigationContainer>
    <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Admin" component={AdminPanelScreen} />
      <Stack.Screen name="WordCard" component={WordCardScreen} />
      <Stack.Screen name="WordForm" component={WordFormScreen} />
    </Stack.Navigator>
  </NavigationContainer>


}

export default App;
