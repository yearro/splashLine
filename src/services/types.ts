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