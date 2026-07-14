import { secureGetItem, secureRemoveItem, secureSetItem } from '@/helpers/secure-store.adapter';
import { create } from 'zustand';

interface UserStore {
  user: string | null;
  setUser: (user: string) => Promise<boolean>;
  getUser: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()((set, get) => ({
  user: null,
  setUser: async (user: string) => {
    set({ user });
    return await secureSetItem('user', user);
  },
  getUser: async () => {
    const user = await secureGetItem('user');
    if (user) {
      set({ user });
    }
  },
  clearUser: async () => {
    set({ user: null });
    await secureRemoveItem('user');
  },
}));