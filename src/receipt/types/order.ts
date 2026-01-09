import type { ServiceId } from '@/interfaces/service.interface';

export type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  customer_id: string;
  vehicle_id: string;
  mileage: number;
  fuel: string;
  reception_date: Date;
  mechanic_id: string;
  received_by: string;
  services: ServiceId[];
  status: OrderStatus;
  notes: string;
}
