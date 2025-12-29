import { AdminHeader } from '@/dasboard/components/AdminHeader';

export const VehiclesPage = () => {
  return (
    <div>
      <AdminHeader
        title="Vehículos"
        description="Gestión de vehículos"
        to="/dashboard/vehicles/new"
      />
    </div>
  );
};
