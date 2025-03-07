import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { transformWord, TransformationType } from '../utils/textTransformations';

interface TwistedWordCardProps {
  word: string;                // The word to display (required)
  imagePath?: string;          // Path to image (for future implementation)
  maxLength?: number;          // Maximum character length (default: 16)
  transformType?: TransformationType;  // Type of position transformation
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
          <View key={index} style={styles.boxWrapper}>
            <View style={styles.boxShadow}>
              <View style={styles.box}>
                <Text style={styles.char}>{char}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 32,
    paddingBottom: 36,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    marginBottom: 24,
    borderRadius: 16,
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
    alignItems: 'center',
    marginTop: 8,
    marginHorizontal: -2,
  },
  boxWrapper: {
    margin: 2,
  },
  boxShadow: {
    borderRadius: 14,
    backgroundColor: '#ffffff',
  },
  box: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#e6ebff',
    borderWidth: 2.5,
    borderColor: '#3b5bdb',
    overflow: 'hidden',
  },
  char: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a365d',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    height: 24,
    lineHeight: 24,
  },
});

export default TwistedWordCard; 