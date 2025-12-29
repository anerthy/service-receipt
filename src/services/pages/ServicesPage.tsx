import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useServices } from '../hooks/useServices';
import { FullScreenLoading } from '@/components/custom/FullScreenLoading';
import type { Service } from '@/interfaces';
import { Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/custom/Pagination';

export function ServicesPage() {
  const { data, isLoading, error } = useServices();

  if (isLoading) return <FullScreenLoading />;

  if (error) return <div>Error loading services.</div>;

  const services: Service[] = data || [];

  return (
    <Table>
      <TableCaption>Servicios que ofrece el taller</TableCaption>
      <TableHeader>
        <TableHead className="flex gap-1 items-center justify-start">
          <Wrench />
          <h1 className="font-bold text-2xl">Servicios</h1>
        </TableHead>
        <TableRow>
          <TableHead className="w-25">Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Costo Estimado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell className="font-medium">{service.name}</TableCell>
            <TableCell>{service.description}</TableCell>
            <TableCell>
              <Badge variant={service.is_active ? 'default' : 'destructive'}>
                {service.is_active ? 'Activo' : 'Inactivo'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {service.estimated_cost}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>
            <Pagination totalPages={Math.ceil(services.length / 10)} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
