import { useQuery } from '@tanstack/react-query';
import { getServicesAction } from '../actions/get-services.action';

export const useServices = () => {
  const query = useQuery({
    queryKey: ['services'],
    queryFn: getServicesAction,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    ...query,
  };
};
