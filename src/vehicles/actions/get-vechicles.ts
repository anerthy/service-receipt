import type { Vehicle } from '@/interfaces';
import { supabase } from '@/lib/supabase';

export interface Options {
  customer_id?: string;
  plate?: string;
}

export const getVehicles = async (options: Options): Promise<Vehicle[]> => {
  const query = supabase.from('vehicles').select('*');

  if (options.plate) query.eq('plate', options.plate);
  if (options.customer_id) query.eq('customer_id', options.customer_id);

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data;
};
