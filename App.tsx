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

export type RootStackParamList = {
  Home: undefined;
  Admin: undefined;
  WordCard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  // TODO:
  //  - Create client for requests
  //  - Create class for s3 data upload
  //  - Create default seeds for init db
  //  - Handle small collections
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
    </Stack.Navigator>
  </NavigationContainer>


}

export default App;
