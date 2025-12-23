export interface OrderDetail {
  id: string;
  order_id: string;
  service_id: string;
  technician_notes: string;
  cost: number;
  created_at: Date;
}
