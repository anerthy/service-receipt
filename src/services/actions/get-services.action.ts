import type { Service } from '@/interfaces';
import { supabase } from '@/lib/supabase';

export const getServicesAction = async (): Promise<Service[]> => {
  const { data, error } = await supabase.from('services').select('*');

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data.map(
    (service) =>
      ({
        id: service.id,
        name: service.name,
        description: service.description,
        estimated_cost: service.estimated_cost,
        is_active: service.is_active,
        created_at: service.created_at,
        updated_at: service.updated_at,
      } as Service)
  );
};
