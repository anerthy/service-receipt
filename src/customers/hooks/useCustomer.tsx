import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { upsertCustomer } from '../actions/upsert-customer';
import { getCustomerAction } from '../actions/get-customer-by-id.action';

export const useCustomer = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['customers', { id }],
    queryFn: async () => getCustomerAction(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: upsertCustomer,
    onSuccess: (customer) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({
        queryKey: ['customers', { id: customer.id }],
      });

      queryClient.setQueryData(['customers', { id: customer.id }], customer);
    },
    onError: (error) => {
      console.error('Error upserting customer:', error);
    },
  });

  return { ...query, mutation };
};
