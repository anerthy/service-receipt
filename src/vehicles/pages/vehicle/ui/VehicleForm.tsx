import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCustomers } from '@/customers/hooks/useCustomers';
import type { Vehicle } from '@/interfaces';
import { VehicleMaterials, VehicleTypes } from '@/interfaces/vehicle.interface';

import { useForm } from 'react-hook-form';

interface Props {
  vehicle: Vehicle;
  onSubmit: (vehicleLike: Partial<Vehicle>) => Promise<void>;
  isPending: boolean;
}

export const VehicleForm = ({ vehicle, onSubmit, isPending }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<Vehicle>({
    defaultValues: vehicle,
  });

  const selectedMaterial = watch('material');
  const selectedType = watch('type');

  const { data: customers = [] } = useCustomers();

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Datos del vehiculo</h1>
          <p className="text-muted-foreground text-sm text-balance">
            LLena los siguientes campos para crear un nuevo vehiculo.
          </p>
        </div>
        <Input hidden id="id" value={vehicle.id} />
        <Field className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="plate">Placa</FieldLabel>
            <Input
              id="plate"
              type="text"
              placeholder="ABC-1234"
              {...register('plate', {
                required: 'Debe ingresar la placa',
              })}
              className={
                errors.plate ? 'border-red-500 focus:ring-red-500' : ''
              }
              required
            />
            {errors.plate && (
              <FieldError className="text-red-500">
                {errors.plate.message}
              </FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="customer">Cliente</FieldLabel>
            <Select
              {...register('customer_id')}
              onValueChange={(value) => {
                setValue('customer_id', value);
              }}
              defaultValue={getValues('customer_id')}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un cliente" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectGroup>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.plate && (
              <FieldError className="text-red-500">
                {errors.plate.message}
              </FieldError>
            )}
          </Field>
        </Field>

        <Field className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="brand">Marca</FieldLabel>
            <Input
              id="brand"
              type="text"
              placeholder="Toyota"
              {...register('brand', {
                required: 'Campo obligatorio',
              })}
              required
            />
            {errors.brand && (
              <FieldError className="text-red-500">
                {errors.brand.message}
              </FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="model">Modelo</FieldLabel>
            <Input
              id="model"
              type="text"
              className={
                errors.model ? 'border-red-500 focus:ring-red-500' : ''
              }
              {...register('model', {
                required: 'El modelo es obligatorio',
              })}
              placeholder="2026"
              required
            />
            {errors.model && (
              <FieldError className="text-red-500">
                {errors.model.message}
              </FieldError>
            )}
          </Field>
        </Field>
        <Field className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="size">Talla</FieldLabel>
            <Input
              id="size"
              type="text"
              placeholder="S, M, L"
              {...register('size', {
                // required: 'Campo obligatorio',
              })}
              // required
            />
            {errors.size && (
              <FieldError className="text-red-500">
                {errors.size.message}
              </FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="color">Color</FieldLabel>
            <Input
              id="color"
              type="text"
              className={
                errors.color ? 'border-red-500 focus:ring-red-500' : ''
              }
              {...register('color', {
                required: 'El color es obligatorio',
              })}
              placeholder="Rojo, Azul, Blanco..."
              required
            />
            {errors.color && (
              <FieldError className="text-red-500">
                {errors.color.message}
              </FieldError>
            )}
          </Field>
        </Field>
        <Field className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="type">Tipo</FieldLabel>
            <Field>
              <Select
                {...register('type')}
                onValueChange={(value) => {
                  setValue('type', value);
                }}
                defaultValue={selectedType}
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  <SelectGroup>
                    {VehicleTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            {errors.type && (
              <FieldError className="text-red-500">
                {errors.type.message}
              </FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="type">Material</FieldLabel>
            <Field>
              <Select
                {...register('material')}
                onValueChange={(value) => {
                  setValue('material', value);
                }}
                defaultValue={selectedMaterial}
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  <SelectGroup>
                    {VehicleMaterials.map((material) => (
                      <SelectItem key={material.id} value={material.id}>
                        {material.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            {errors.material && (
              <FieldError className="text-red-500">
                {errors.material.message}
              </FieldError>
            )}
          </Field>
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
