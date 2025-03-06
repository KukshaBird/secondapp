/**
 * Game-related type definitions
 */

export interface DraggableCharacterProps {
  char: string;
  index: number;
  onSelect: (index: number) => void;
  isSelected?: boolean;
}

export interface WordTargetAreaProps {
  targetSlots: Array<string | null>;
  onSlotPress: (index: number) => void;
}

export interface WordGameProps {
  word: string;
  imagePath?: string;
  onSuccess?: () => void;
}

export type GameStatus = 'playing' | 'success' | 'failed'; 