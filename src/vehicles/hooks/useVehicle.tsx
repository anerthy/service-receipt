import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getVehicleById } from '../actions/get-vehicle-by-id';
import { upsertVehicle } from '../actions/upsert-vehicle';

export const useVehicle = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['vehicles', { id }],
    queryFn: () => getVehicleById(id),
    retry: false,
    staleTime: 60 * 60 * 1000, // 60 minutes
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: upsertVehicle,
    onSuccess: (vehicle) => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      queryClient.invalidateQueries({
        queryKey: ['vehicles', { id: vehicle.id }],
      });

      queryClient.setQueryData(['vehicles', { id: vehicle.id }], vehicle);
    },
    onError: (error) => {
      console.error('Error upserting vehicle:', error.message);
    },
  });

  return {
    ...query,
    mutation,
  };
};
