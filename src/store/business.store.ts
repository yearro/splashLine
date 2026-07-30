import { createPackage, getAllPackages, updatePackage } from '@/services/dataPackages';
import { createService, deleteService, getAllServices, updateService } from '@/services/dataService';
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
  serviceIds?: number[];
}

interface businessStore {
  services: serviceItem[];
  packages: packageItem[];
  addToServices: (id: number, name: string, price: number, description: string) => Promise<number | false>;
  fetchServices: () => Promise<void>;
  fetchPackages: () => Promise<void>;
  removeFromServices: (id: number) => Promise<boolean>;
  addToPackages: (id: number, name: string, description: string, serviceIds?: number[]) => Promise<number | false>;
  removeFromPackages: (id: number) => void;
  clearAll: () => void;
}

export const useBusinessStore = create<businessStore>()((set, get) => ({
  services: [],
  packages: [],
  addToServices: async (id: number, name: string, price: number, description: string) => {
    try {
      const result = id < 0 ? await createService(name, price, description) : await updateService(id, name, price, description);
      if (id > 0) {
        get().removeFromServices(id);
      }
      if (result) {
        set((state) => ({ services: [...state.services, { id: result, name, price, description }] }));
      }
      return result;
    } catch (error) {
      return false;
    }
  },
  fetchServices: async () => {
    const services: any[] = await getAllServices();
    set(() => ({ services }));
  },
  fetchPackages: async () => {
    const packages: any[] = await getAllPackages();
    set(() => ({ packages }));
  },
  removeFromServices: async (id: number) => {
    try {
      await deleteService(id);
      set((state) => ({ services: state.services.filter((i: serviceItem) => i.id !== id) }))
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  addToPackages: async (id: number, name: string, description: string, serviceIds: number[] = []) => {
    console.log("llega al add to packages")
    try {
      const result = id < 0 ? await createPackage(name, description, serviceIds) : await updatePackage(id, name, description, serviceIds);
      if (id > 0) {
        get().removeFromPackages(id);
      }
      if (result) {
        set((state) => ({ packages: [...state.packages, { id: result, name, description, serviceIds }] }));
      }
      return result;
    } catch (error) {
      return false;
    }
  },
  removeFromPackages: (id: number) => set((state) => ({
    packages: state.packages.filter((i: packageItem) => i.id !== id),
  })),
  clearAll: () => set(() => ({
    services: [],
    packages: []
  })),
}));