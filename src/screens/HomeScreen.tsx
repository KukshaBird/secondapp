import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StatusBar, TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants';
import { styles } from "./styles.ts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App.tsx";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({ navigation }: Props): React.JSX.Element => {

  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Головне Меню</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('WordCard')}
          >
            <Text style={styles.buttonText}>Грати</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Admin')}
          >
            <Text style={styles.buttonText}>Адмін Панель</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </>
  );
};



export default HomeScreen; 