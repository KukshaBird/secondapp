import Sound from 'react-native-sound';

// Enable playback in silence mode
Sound.setCategory('Playback');

class SoundEffect {
  private sound: Sound;
  private isLoaded: boolean = false;

  constructor(fileName: string) {
    this.sound = new Sound(fileName, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      this.isLoaded = true;
    });
  }

  play() {
    if (!this.isLoaded) return;
    
    this.sound.play((success) => {
      if (!success) {
        console.log('Sound playback failed');
      }
    });
  }

  release() {
    if (this.sound) {
      this.sound.release();
    }
  }
}

// Create sound instances
export const sounds = {
  pop: new SoundEffect('pop.mp3'),
  success: new SoundEffect('success.mp3'),
  error: new SoundEffect('error.mp3'),
  complete: new SoundEffect('complete.mp3'),
};

// Play functions
export const playSoundEffect = {
  pop: () => sounds.pop.play(),
  success: () => sounds.success.play(),
  error: () => sounds.error.play(),
  complete: () => sounds.complete.play(),
};

// Cleanup function
export const releaseSounds = () => {
  Object.values(sounds).forEach(sound => sound.release());
}; 