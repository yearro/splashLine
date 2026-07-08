import { createMMKV } from 'react-native-mmkv';

export type immkvStorage = {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
}

const storage = createMMKV()

export const mmkvStorage = (): immkvStorage => {
  return {
    setItem: (key: string, value: string) => {
      storage.set(key, value);
    },
    getItem: (key: string) => {
      const value = storage.getString(key);
      return value ?? null;
    },
    removeItem: (key: string) => {
      storage.remove(key);
    },
  };
};