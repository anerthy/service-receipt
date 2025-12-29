import { useQuery } from '@tanstack/react-query';
import { getMechanicsAction } from '../actions/get-mechanics.action';

export const useMechanics = () => {
  const query = useQuery({
    queryKey: ['mechanics'],
    queryFn: getMechanicsAction,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return { ...query };
};
