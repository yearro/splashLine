import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="services" options={{ title: 'Services' }} />
      <Stack.Screen name="packages" options={{ title: 'Packages' }} />
      <Stack.Screen name="userInformation" options={{ title: 'User Information' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({})

export default Layout;
