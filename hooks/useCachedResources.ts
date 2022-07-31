import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          // 'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'poppins-400': require('../assets/fonts/Poppins-Regular.ttf'),
          'poppins-500': require('../assets/fonts/Poppins-Medium.ttf'),
          'poppins-600': require('../assets/fonts/Poppins-SemiBold.ttf'),
          'poppins-700': require('../assets/fonts/Poppins-Bold.ttf'),
          'raleway-400': require('../assets/fonts/Raleway-Regular.ttf'),
          'raleway-500': require('../assets/fonts/Raleway-Medium.ttf'),
          'raleway-600': require('../assets/fonts/Raleway-SemiBold.ttf'),
          'raleway-700': require('../assets/fonts/Raleway-Bold.ttf'),
          'raleway-800': require('../assets/fonts/Raleway-ExtraBold.ttf'),
          'raleway-900': require('../assets/fonts/Raleway-Black.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // To ALWAYS show Splash Screen atleast 1 SEC
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
