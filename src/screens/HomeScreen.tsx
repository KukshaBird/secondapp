import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { WordCard, WordDisplay, TwistedWordCard } from '../components';

const HomeScreen = (): React.JSX.Element => {
  const [word] = useState("hello");
  const [transformType, setTransformType] = useState<'none' | 'shuffle' | 'reverse' | 'random'>('random');
  
  const cycleTransformation = () => {
    const types: Array<'none' | 'shuffle' | 'reverse' | 'random'> = ['none', 'shuffle', 'reverse', 'random'];
    const currentIndex = types.indexOf(transformType);
    const nextIndex = (currentIndex + 1) % types.length;
    setTransformType(types[nextIndex]);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      
      <WordCard word={word} />
      <WordDisplay word={word} />
      
      <View style={styles.transformSection}>
        <Text style={styles.sectionTitle}>Twisted Word</Text>
        <Text style={styles.transformLabel}>
          Current transformation: {transformType}
        </Text>
        <TwistedWordCard word={word} transformType={transformType} />
        <Button title="Change Transformation" onPress={cycleTransformation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  transformSection: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
  transformLabel: {
    marginBottom: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default HomeScreen; 