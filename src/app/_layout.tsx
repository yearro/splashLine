import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

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
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: '',
            headerLeft: () => (
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Ionicons name="water-outline" size={26} color="#008190" />
                <Text style={styles.title}>SPLASH-LAB</Text>
              </View>
            ),
          }} />
      </Stack>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginLeft: 8,
    fontFamily: 'Inter_18pt-Black'
  }
});

export default RootLayout