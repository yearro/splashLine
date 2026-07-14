import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

export const setItem = async (key: string, value: string) => {
  try {
    return await SecureStore.setItemAsync(key, value);
  } catch (error) {
    Alert.alert(`Problems saving ${value}`);
  }
}

export const getItem = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    Alert.alert(`Problems getting ${key}`);
  }
}

export const removeItem = async (key: string) => {
  try {
    return await SecureStore.deleteItemAsync(key);
  } catch (error) {
    Alert.alert(`Problems removing ${key}`);
  }
}