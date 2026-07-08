import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './utils.key.value';

interface QueueStore {
  queue: any[];
  addToQueue: (item: any) => void;
  removeFromQueue: (item: any) => void;
  clearQueue: () => void;
}

export const useQueueStore = create<QueueStore>()(
  persist(
    (set) => ({
      queue: [],
      addToQueue: (item: any) =>
        set((state) => ({
          queue: [...state.queue, item],
        })),
      removeFromQueue: (item: any) =>
        set((state) => ({
          queue: state.queue.filter((i: any) => i !== item),
        })),
      clearQueue: () =>
        set((state) => ({
          queue: [],
        })),
    }),
    {
      name: 'queue',
      storage: createJSONStorage(mmkvStorage),
    }
  )
);