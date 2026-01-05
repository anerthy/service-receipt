export interface ServiceOrder {
  id: string;
  customer_id: string;
  vehicle_id: string;
  mileage: number;
  fuel: string;
  reception_date: Date;
  completion_date?: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  total_cost: number;
  notes: string;
  mechanic_id: string;
  received_by: string;
  created_at?: Date;
  updated_at?: Date;
}
