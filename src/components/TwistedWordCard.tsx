import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { transformWord } from '../utils/textTransformations';

interface TwistedWordCardProps {
  word: string;                // The word to display (required)
  imagePath?: string;          // Path to image (for future implementation)
  maxLength?: number;          // Maximum character length (default: 16)
  transformType?: 'none' | 'shuffle' | 'reverse' | 'random';  // Type of position transformation
}

const TwistedWordCard: React.FC<TwistedWordCardProps> = ({
  word,
  imagePath,
  maxLength = 16,
  transformType = 'random'
}) => {
  // Ensure the word doesn't exceed the maximum length
  const limitedWord = word.substring(0, maxLength);
  
  // Apply position transformations to the word
  const transformedChars = transformWord(limitedWord, transformType);
  
  return (
    <View style={styles.card}>
      {/* Image section - for future implementation */}
      {imagePath && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imagePath }} style={styles.image} />
        </View>
      )}
      
      {/* Characters container */}
      <View style={styles.characterContainer}>
        {transformedChars.map((char, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.char}>{char}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  characterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  box: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  char: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TwistedWordCard; 