import { useQuery } from '@tanstack/react-query';
import { getVehicles, type Options } from '../actions/get-vechicles';

export const useVehicles = (options: Options) => {
  const query = useQuery({
    queryKey: ['vehicles', options],
    queryFn: () => getVehicles(options),
    retry: false,
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    ...query,
  };
};
