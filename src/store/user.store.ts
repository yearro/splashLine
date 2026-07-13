import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserStore {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: string) => set(() => ({ user })),
      clearUser: () => set(() => ({ user: null })),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);