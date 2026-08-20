import { addHistoryService, getAllServiceHistory } from "@/services/dataService";
import { ServiceHistory } from "@/services/types";
import { create } from "zustand";

interface HistoryStore {
  totalServices: number,
  servicesHistory: ServiceHistory[] | null,
  addServiceHistory: (time_service: number, price: number) => Promise<boolean | number>,
  getServicesHistory: (year: number) => Promise<void>
}
export const useHistoryStore = create<HistoryStore>()((set, get) => ({
  totalServices: 0,
  servicesHistory: [],
  addServiceHistory: async (time_service: number, price: number) => {
    try {
      const result = await addHistoryService(time_service, price);
      if (result) {
        set((state) => ({
          totalServices: state.totalServices + 1
        }))
      }
      return result;
    } catch (error) {
      return false;
    }
  },
  getServicesHistory: async (year: number) => {
    try {
      const result: unknown[] = await getAllServiceHistory(year);
      set(() => ({ totalServices: result.length, servicesHistory: result as ServiceHistory[] }))
    } catch (error) {
      console.log("error", error);
    }
  }
}))