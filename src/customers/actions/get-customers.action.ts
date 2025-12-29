import type { Customer } from '@/interfaces';
import { supabase } from '@/lib/supabase';

export const getCustomersAction = async (): Promise<Customer[]> => {
  const { data, error } = await supabase.from('customers').select('*');

  if (error) {
    console.error(error);
    throw new Error('Error fetching customers');
  }

  return data as Customer[];
};
