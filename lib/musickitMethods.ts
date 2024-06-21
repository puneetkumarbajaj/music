
let musicInstance: MusicKit.MusicKitInstance | null;

// Initialize MusicKit without automatically authorizing the user
export const initializeMusicKit = async (developerToken: string): Promise<MusicKit.MusicKitInstance | null> => {
  if (window.MusicKit) {
    try {
      musicInstance = window.MusicKit.configure({
        developerToken,
        app: {
          name: 'Applify',
          build: '0.1',
        },
      });
      console.log('MusicKit initialized successfully. message from musickit.ts: initializeMusicKit()');
      return musicInstance;
    } catch (error) {
      console.error('MusicKit initialization failed:', error);
      return null;
    }
  } else {
    console.log('MusicKit SDK not loaded. error from musickit.ts: initializeMusicKit()');
    return null;
  }
};


// Function to trigger the authorization process
export const authorizeMusicKit = async (): Promise<void> => {
  if (!musicInstance) {
    console.error('MusicKit is not initialized. error from musickit.ts: authorizeMusicKit()');
    return;
  }
  try {
    await musicInstance.authorize();
    console.log('User is authorized:', musicInstance.isAuthorized);
  } catch (error) {
    console.error('Error authorizing MusicKit:', error);
  }
};

export const getMusicKitInstance = (): MusicKit.MusicKitInstance | null => musicInstance;

