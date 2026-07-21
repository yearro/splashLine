import { createService, updateService } from '@/services/dataService';
import { create } from 'zustand';

type serviceItem = {
  id: number;
  name: string;
  price: number;
  description: string;
}

type packageItem = {
  id: number;
  name: string;
  description: string;
}

interface businessStore {
  services: serviceItem[];
  packages: packageItem[];
  addToServices: (id: number, name: string, price: number, description: string) => Promise<number | false>;
  removeFromServices: (id: number) => void;
  addToPackages: (id: number, name: string, description: string) => void;
  removeFromPackages: (id: number) => void;
  clearAll: () => void;
}

export const useBusinessStore = create<businessStore>()((set, get) => ({
  services: [],
  packages: [],
  addToServices: async (id: number, name: string, price: number, description: string) => {
    try {
      const result = id === 0 ? await createService(name, price, description) : await updateService(id, name, price, description);
      if (result) {
        set((state) => ({ ...state, services: [...state.services, { id, name, price, description }] }));
      }
      return result;
    } catch (error) {
      return false;
    }
  },
  removeFromServices: (item: any) => set((state) => ({
    services: state.services.filter((i: any) => i !== item),
  })),
  addToPackages: (item: any) => set((state) => ({
    packages: [...state.packages, item],
  })),
  removeFromPackages: (item: any) => set((state) => ({
    packages: state.packages.filter((i: any) => i !== item),
  })),
  clearAll: () => set(() => ({
    services: [],
    packages: []
  })),
}));