import type { Customer } from '@/interfaces';
import { supabase } from '@/lib/supabase';

export const getCustomerAction = async (id: string): Promise<Customer> => {
  if (!id) throw new Error('Invalid customer ID');

  if (id === 'new')
    return {
      id: 'new',
      dni: '',
      name: '',
      address: '',
      email: '',
      phone: '',
    } as Customer;

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Error fetching customer');
  }

  return data as Customer;
};
