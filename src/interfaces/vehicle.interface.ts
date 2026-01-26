export interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  size: string;
  type: string;
  material: string;
  color: string;
  cubic_capacity: number;
  customer_id: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export const VehicleTypes = [
  {
    id: 'ROAD',
    name: 'Ruta',
  },
  {
    id: 'MTB',
    name: 'Montaña',
  },
  {
    id: 'DS',
    name: 'Doble Suspensión',
  },
  {
    id: 'TT',
    name: 'TT / Contrareloj',
  },
];

export const VehicleMaterials = [
  {
    id: 'ALUM',
    name: 'Aluminio',
  },
  {
    id: 'CARB',
    name: 'Carbono',
  },
  {
    id: 'OTR',
    name: 'Otro',
  },
];
