export interface Service {
  id: string;
  name: string;
  description: string;
  estimated_cost: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
