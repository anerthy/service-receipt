import type { Mechanic } from '@/interfaces';
import { supabase } from '@/lib/supabase';

export const getMechanics = async (): Promise<Mechanic[]> => {
  const { data, error } = await supabase.from('mechanics').select();

  if (error) {
    console.log(error);
    return [];
  }

  return data.map(
    (mechanic) =>
      ({
        ...mechanic,
      } as Mechanic)
  );
};
