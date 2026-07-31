import { create } from 'zustand';

interface QueueStore {
  queue: any[];
  addToQueue: (item: any) => void;
  removeFromQueue: (item: any) => void;
  clearQueue: () => void;
}

export const useQueueStore = create<QueueStore>()((set, get) => ({
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
}));