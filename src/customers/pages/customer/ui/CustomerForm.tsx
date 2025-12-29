import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Customer } from '@/interfaces';

import { useForm } from 'react-hook-form';

interface Props {
  customer: Customer;
  onSubmit: (customerLike: Partial<Customer>) => Promise<void>;
  isPending: boolean;
}

export const CustomerForm = ({ customer, onSubmit, isPending }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>({
    defaultValues: customer,
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Datos del cliente</h1>
          <p className="text-muted-foreground text-sm text-balance">
            LLena los siguientes campos para crear un nuevo cliente.
          </p>
        </div>
        <Input hidden id="id" value={customer.id} />
        <Field>
          <FieldLabel htmlFor="dni">Identificación</FieldLabel>
          <Input
            id="dni"
            type="text"
            placeholder="101230123"
            {...register('dni', {
              required: 'Debe ingresar el DNI',
            })}
            className={errors.dni ? 'border-red-500 focus:ring-red-500' : ''}
            required
          />
          {errors.dni && (
            <FieldDescription className="text-red-500">
              {errors.dni.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register('name', {
              required: 'Campo obligatorio',
              minLength: {
                value: 5,
                message: 'El nombre debe tener al menos 5 caracteres',
              },
            })}
            required
          />
          {errors.name && (
            <FieldDescription className="text-red-500">
              {errors.name.message}
            </FieldDescription>
          )}
        </Field>
        <Field className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
            <Input
              id="phone"
              type="text"
              className={
                errors.phone ? 'border-red-500 focus:ring-red-500' : ''
              }
              {...register('phone', {
                required: 'El teléfono es obligatorio',
                minLength: {
                  value: 8,
                  message: 'El teléfono debe tener al menos 8 caracteres',
                },
              })}
              placeholder="555-1234"
              required
            />
            {errors.phone && (
              <FieldDescription className="text-red-500">
                {errors.phone.message}
              </FieldDescription>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Formato de email inválido',
                },
              })}
              placeholder="m@example.com"
              required
            />
            {errors.email && (
              <FieldDescription className="text-red-500">
                {errors.email.message}
              </FieldDescription>
            )}
          </Field>
        </Field>
        <Field>
          <FieldLabel htmlFor="address">Dirección</FieldLabel>
          <Textarea
            id="address"
            {...register('address', {
              required: 'La dirección es obligatoria',
              minLength: {
                value: 10,
                message: 'La dirección debe tener al menos 10 caracteres',
              },
            })}
            placeholder="Dirección exacta"
            required
          />
          {errors.address && (
            <FieldDescription className="text-red-500">
              {errors.address.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <Button type="submit" disabled={isPending}>
            Guardar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
