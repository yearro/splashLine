export type Service = {
  name: string;
  price: number;
  description?: string;
}

export type ServiceHistory = {
  id?: number;
  date: string;
  price: number;
  time_service: number;
}

export type CarInQueue = {
  id: number;
  createdAt: string;
  make: string;
  model: string;
  phone: string;
  plateNumber: string;
  price: number;
  status: string;
  tier: string;
}

export type TopNumbers = {
  total_servicios: number;
  total_ingresos: number;
  tiempo_total_minutos: number;
}