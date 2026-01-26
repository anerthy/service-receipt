import type { Vehicle } from '@/interfaces';
import { useNavigate, useParams } from 'react-router';
import { FullScreenLoading } from '@/components/custom/FullScreenLoading';
import { toast } from 'sonner';
import { useVehicle } from '@/vehicles/hooks/useVehicle';
import { VehicleForm } from './ui/VehicleForm';

export const VehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: vehicle,
    isLoading,
    isError,
    error,
    mutation,
  } = useVehicle(id!);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!vehicle) {
    return <div>Error loading vehicle.</div>;
  }

  const handleSubmit = async (vehicleLike: Partial<Vehicle>) => {
    // console.log(vehicleLike);

    await mutation.mutateAsync(vehicleLike, {
      onSuccess: (vehicle) => {
        toast.success('Datos del vehículo guardados correctamente');
        navigate(`/dashboard/vehicles/${vehicle.id}`);
      },
      onError: (error) => {
        toast.error(
          'Ha ocurrido un error al guardar los datos del cliente ' +
            error.message,
          {
            position: 'top-right',
          },
        );
      },
    });
  };

  return (
    <VehicleForm vehicle={vehicle} onSubmit={handleSubmit} isPending={false} />
  );
};
