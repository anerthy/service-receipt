import type { Customer } from '@/interfaces';
import { supabase } from '@/lib/supabase';

export const upsertCustomer = async (
  customerLike: Partial<Customer>
): Promise<Customer> => {
  const { id } = customerLike;

  const isCreating = !id || id === 'new';

  const customerToUpsert = isCreating
    ? { ...customerLike, id: undefined }
    : customerLike;

  const { data, error } = await supabase
    .from('customers')
    .upsert(customerToUpsert)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Error upserting customer');
  }

  return data as Customer;
};
