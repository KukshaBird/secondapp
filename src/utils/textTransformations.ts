/**
 * Utility functions for text transformations
 */

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param array Array to shuffle
 * @returns Shuffled array
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Transform a word by rearranging its characters
 * @param word Word to transform
 * @param transformType Type of position transformation to apply
 * @returns Transformed word with characters in new positions
 */
export const transformWord = (
  word: string,
  transformType: 'none' | 'shuffle' | 'reverse' | 'random' = 'none'
): string[] => {
  const chars = word.split('');
  
  switch (transformType) {
    case 'shuffle':
      // Completely randomize character positions
      return shuffleArray(chars);
    
    case 'reverse':
      // Reverse the order of characters
      return [...chars].reverse();
    
    case 'random':
      // Choose a random transformation type
      const transforms = ['none', 'shuffle', 'reverse'];
      const randomTransform = transforms[Math.floor(Math.random() * transforms.length)];
      return transformWord(word, randomTransform as any);
    
    case 'none':
    default:
      // Return characters in original order
      return chars;
  }
};

export default {
  transformWord
}; 