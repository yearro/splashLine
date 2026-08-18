import { create } from 'zustand';

interface QueueStore {
  queue: any[];
  addToQueue: (item: any) => void;
  removeFromQueue: (id: string) => void;
  clearQueue: () => void;
}

export const useQueueStore = create<QueueStore>()((set, get) => ({
  queue: [],
  addToQueue: (item: any) =>
    set((state) => ({
      queue: [...state.queue, item],
    })),
  removeFromQueue: (id: string) =>
    set((state) => ({
      queue: state.queue.filter((i: any) => i.id !== id),
    })),
  clearQueue: () =>
    set((state) => ({
      queue: [],
    })),
}));