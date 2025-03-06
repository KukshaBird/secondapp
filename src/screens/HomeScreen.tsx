import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WordCard, WordDisplay } from '../components';

const HomeScreen = (): React.JSX.Element => {
  const word = "hello"; // Hardcoded word for now
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      
      <WordCard word={word} />
      <WordDisplay word={word} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default HomeScreen; 