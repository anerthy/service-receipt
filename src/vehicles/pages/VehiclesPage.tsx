import { AdminHeader } from '@/dasboard/components/AdminHeader';
import { useVehicles } from '../hooks/useVehicles';
import { FullScreenLoading } from '@/components/custom/FullScreenLoading';

export const VehiclesPage = () => {
  const { data: vehicles, isLoading } = useVehicles({});

  if (isLoading) return <FullScreenLoading />;

  return (
    <div>
      <AdminHeader
        title="Vehículos"
        description="Gestión de vehículos"
        to="/dashboard/vehicles/new"
      />
      {vehicles && vehicles.length === 0 ? (
        <p>No hay vehículos registrados.</p>
      ) : (
        <ul>
          {vehicles?.map((vehicle) => (
            <li key={vehicle.id}>
              {' '}
              {vehicle.model} ({vehicle.year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
