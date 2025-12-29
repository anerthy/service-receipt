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
import { FullScreenLoading } from '@/components/custom/FullScreenLoading';
import type { Customer } from '@/interfaces';
import { Pen, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCustomers } from '../hooks/useCustomers';
import { Pagination } from '@/components/custom/Pagination';

export function CustomersPage() {
  const { data, isLoading, error } = useCustomers();

  if (isLoading) return <FullScreenLoading />;

  if (error) return <div>Error loading customers.</div>;
  const customers: Customer[] = data || [];

  return (
    <Table>
      <TableCaption>Lista de clientes del Taller</TableCaption>
      <TableHeader>
        <TableHead className="flex gap-1 items-center justify-start">
          <Wrench />
          <h1 className="font-bold text-2xl">Servicios</h1>
        </TableHead>
        <TableRow>
          <TableHead className="w-25">DNI</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Telefono</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">{customer.dni}</TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>
              <Badge variant="secondary">
                <Pen />
                Editar
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            <Pagination totalPages={Math.ceil(customers.length / 10)} />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
