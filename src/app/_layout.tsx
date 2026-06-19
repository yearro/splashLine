import { useFonts } from 'expo-font';
import { Slot } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import "../../global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Inter_18pt-Black': require('../../assets/fonts/Inter_18pt-Black.ttf'),
    'Inter_18pt-Light': require('../../assets/fonts/Inter_18pt-Light.ttf'),
    'Inter_18pt-Medium': require('../../assets/fonts/Inter_18pt-Medium.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();

  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Slot />
    </SafeAreaProvider>
  )
}
export default RootLayout