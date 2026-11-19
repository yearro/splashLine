import { formatTime } from "@/helpers/formatTime";
import { getMonthName } from "@/helpers/montName";
import { addHistoryService, getAllServiceHistory, getTotalNumbers } from "@/services/dataService";
import { BarChartHistory, ServiceHistory } from "@/services/types";
import { create } from "zustand";

interface HistoryStore {
  totalServices: number,
  totalRevenue: number,
  avgTime: string,
  servicesHistory: BarChartHistory[],
  addServiceHistory: (time_service: number, price: number) => Promise<boolean | number>,
  getServicesHistory: (year: number) => Promise<void>,
  getTopNumbers: () => Promise<void>
}
export const useHistoryStore = create<HistoryStore>()((set, get) => ({
  totalServices: 0,
  totalRevenue: 0,
  avgTime: '00:00',
  servicesHistory: [],
  addServiceHistory: async (time_service: number, price: number) => {
    try {
      const result = await addHistoryService(time_service, price);
      if (result) {
        set((state) => ({
          totalServices: state.totalServices + 1
        }))
      }
      return true
    } catch (error) {
      return false;
    }
  },
  getTopNumbers: async () => {
    try {
      const result = await getTotalNumbers();
      let avgTime = '00:00';
      if (result?.tiempo_total_minutos) {
        avgTime = formatTime(result.tiempo_total_minutos)
      }
      set(() => ({
        totalServices: result?.total_servicios || 0,
        totalRevenue: result?.total_ingresos || 0,
        avgTime
      }))
    } catch (error) {
      console.log("error", error);
    }
  },
  getServicesHistory: async (year: number) => {
    try {
      const result = await getAllServiceHistory(year);
      if (result.length === 0) {
        set(() => ({ servicesHistory: [] }))
        return;
      }
      const data: { value: number, label: string }[] = [];
      for (let i = 0; i < 12; i++) {
        const value = result.filter((item: ServiceHistory) => new Date(item.date).getMonth() === i);
        const valueSum = Object.values(value).reduce((acc, item) => acc + item.price, 0)
        data.push({ value: valueSum, label: getMonthName(i) })
      }
      set(() => ({ servicesHistory: data }))
    } catch (error) {
      console.log("error", error);
    }
  }
}))