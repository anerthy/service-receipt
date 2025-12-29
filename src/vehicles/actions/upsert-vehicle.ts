import type { Vehicle } from '@/interfaces';
import { supabase } from '@/lib/supabase';

export const upsertVehicle = async (
  vehicleLike: Partial<Vehicle>
): Promise<Vehicle> => {
  const { id } = vehicleLike;

  const isCreating = !id || id === 'new';

  const vehicleToUpsert = isCreating
    ? { ...vehicleLike, id: undefined }
    : vehicleLike;

  const { data, error } = await supabase
    .from('vehicles')
    .upsert(vehicleToUpsert)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data as Vehicle;
};
