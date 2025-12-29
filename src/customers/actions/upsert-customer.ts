import type { Customer } from '@/interfaces';
import { supabase } from '@/lib/supabase';

export const upsertCustomer = async (
  customerLike: Partial<Customer>
): Promise<Customer> => {
  const { id } = customerLike;

  const isCreating = !id || id === 'new';

  const productToUpsert = isCreating
    ? { ...customerLike, id: undefined }
    : customerLike;

  console.log(productToUpsert);

  const { data, error } = await supabase
    .from('customers')
    .upsert(productToUpsert)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Error upserting customer');
  }

  return data as Customer;
};
