import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="services" />
      <Stack.Screen name="packages" />
      <Stack.Screen name="userInformation" />
    </Stack>
  );
}

const styles = StyleSheet.create({})

export default Layout;
