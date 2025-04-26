import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { styles } from "./styles.ts";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App.tsx";


const HomeScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('CardGame')}
          >
            <Text style={styles.buttonText}>Гра "збери слово"</Text>
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