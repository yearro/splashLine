import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

export const secureSetItem = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
    return true;
  } catch (error) {
    Alert.alert(`Problems saving ${value}`);
    return false;
  }
}

export const secureGetItem = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    Alert.alert(`Problems getting ${key}`);
  }
}

export const secureRemoveItem = async (key: string) => {
  try {
    return await SecureStore.deleteItemAsync(key);
  } catch (error) {
    Alert.alert(`Problems removing ${key}`);
  }
}