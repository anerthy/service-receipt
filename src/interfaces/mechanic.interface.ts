export interface Mechanic {
  id: string;
  dni: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}
