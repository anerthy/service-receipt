export interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  cubic_capacity: number;
  customer_id: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
