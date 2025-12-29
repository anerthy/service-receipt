import { useQuery } from '@tanstack/react-query';
import { getCustomersAction } from '../actions/get-customers.action';

export const useCustomers = () => {
  const query = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomersAction,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return { ...query };
};
