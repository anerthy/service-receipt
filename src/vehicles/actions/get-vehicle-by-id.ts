import type { Vehicle } from '@/interfaces';
import { supabase } from '@/lib/supabase';

export const getVehicleById = async (id: string): Promise<Vehicle> => {
  if (!id) throw new Error('Invalid vehicle ID');

  if (id === 'new')
    return {
      id: 'new',
      plate: '',
      brand: '',
      color: '',
      model: '',
      size: '',
      material: '',
      type: '',
      year: new Date().getFullYear(),
      cubic_capacity: 0,
      customer_id: '',
      is_active: true,
    };

  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

  return data as Vehicle;
};
