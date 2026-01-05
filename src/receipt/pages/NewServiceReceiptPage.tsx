import { Input } from '@/components/ui/input';
import type { Customer, ServiceOrder } from '@/interfaces';
import { FUEL_LEVELS } from '@/interfaces/fuel-level.type';
import { supabase } from '@/lib/supabase';
import { useMechanics } from '@/mechanics/hooks/useMechanics';
import { useServices } from '@/services/hooks/useServices';
import {
  ChevronDown,
  ClipboardPen,
  Gauge,
  Motorbike,
  Save,
  Search,
  User,
  Wrench,
  X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const createServiceOrder = async (order: ServiceOrder) => {
  console.log(order);
};

const serviceOrder: ServiceOrder = {
  id: '',
  customer_id: '',
  vehicle_id: '',
  mileage: 0,
  fuel: 'F',
  reception_date: new Date(),
  status: 'pending',
  total_cost: 0,
  notes: '',
  mechanic_id: '',
  received_by: '',
};

export const NewServiceReceiptPage = () => {
  const { data: services = [] } = useServices();
  const { data: mechanics = [] } = useMechanics();

  const customerDNIRef = useRef<HTMLInputElement>(null);
  const [customer, setCustomer] = useState<Customer>({} as Customer);

  const queryCustomer = async () => {
    const customerDNI = customerDNIRef.current?.value;
    if (!customerDNI) return;

    const { data, error } = await supabase
      .from('customers')
      .select()
      .eq('dni', customerDNI);

    if (error || !data || data.length === 0) setCustomer({} as Customer);

    setCustomer((data![0] as Customer) || ({} as Customer));
  };

  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: serviceOrder,
  });

  const fuelLevel = watch('fuel');

  const handleFuelLevel = (level: string) => {
    setValue('fuel', level);
  };

  return (
    <>
      <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden transition-colors duration-200">
        {/* <!-- Sticky Header --> */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#101822]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto w-full">
            <Link to="/">
              <button className="flex items-center justify-center p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X className="text-[24px]" />
              </button>
            </Link>
            <h1 className="text-lg font-bold leading-tight tracking-tight">
              Nueva Boleta
            </h1>
            <button className="text-primary font-semibold text-base px-2 py-1 rounded hover:bg-primary/10 transition-colors">
              Guardar
            </button>
          </div>
        </header>
        <form
          onSubmit={handleSubmit(createServiceOrder)}
          className="relative flex flex-col w-full max-w-lg mx-auto pb-24"
        >
          {/* <!-- Section: Datos del Cliente --> */}
          <section className="mt-4 px-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="text-primary text-[20px]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Datos del Cliente
              </h2>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden p-4 space-y-4">
              {/* <!-- Search DNI --> */}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Buscar por DNI
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                      placeholder="Ej. 101230123"
                      type="string"
                      ref={customerDNIRef}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') queryCustomer();
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <button className="p-1.5 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors">
                        <Search className="text-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Customer Details Grid --> */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                    placeholder="Ej. Juan Pérez"
                    type="text"
                    value={customer.name ? customer.name : ''}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Teléfono
                    </label>
                    <input
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                      placeholder="+506..."
                      type="tel"
                      value={customer.phone ? customer.phone : ''}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Email
                    </label>
                    <input
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                      placeholder="cliente@email.com"
                      type="email"
                      value={customer.email ? customer.email : ''}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Dirección
                  </label>
                  <input
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                    placeholder="Dirección exacta"
                    type="text"
                    value={customer.address ? customer.address : ''}
                  />
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Section: Datos de la Moto --> */}
          <section className="mt-6 px-4">
            <div className="flex items-center gap-2 mb-2">
              <Motorbike className="text-primary text-[20px]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Datos de la Moto
              </h2>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden p-4 space-y-4">
              {/* <!-- Search Placa --> */}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Buscar Placa
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm uppercase font-semibold tracking-wide focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                      placeholder="Ej. 123456"
                      type="text"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <button className="p-1.5 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors">
                        <Search className="text-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Moto Details Grid --> */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Marca
                  </label>
                  <input
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                    placeholder="Ej. Honda"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Modelo
                  </label>
                  <input
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                    placeholder="Ej. XR 150"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Año
                  </label>
                  <input
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                    placeholder="2022"
                    type="number"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Cilindraje
                  </label>
                  <input
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                    placeholder="150cc"
                    type="text"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Color
                  </label>
                  <input
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                    placeholder="Rojo / Negro"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Section: Estado Actual --> */}
          <section className="mt-6 px-4">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="text-primary text-[20px]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Estado Actual
              </h2>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden p-4 space-y-6">
              {/* <!-- Kilometraje --> */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Kilometraje Actual
                </label>
                <div className="relative">
                  <Input
                    id="mileage"
                    type="number"
                    {...register('mileage', {
                      required: 'El kilometraje es obligatorio',
                      min: {
                        value: 0,
                        message: 'El kilometraje no puede ser negativo',
                      },
                    })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white pr-10"
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-2.5 text-sm text-slate-400 font-medium">
                    km
                  </span>
                </div>
              </div>
              {/* <!-- Fuel Level --> */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                    Combustible
                  </label>
                  <span className="text-xs font-bold text-primary">
                    {getValues('fuel')}
                  </span>
                </div>
                <div className="flex w-full bg-slate-100 dark:bg-slate-900 rounded-lg p-1 gap-1">
                  {FUEL_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => handleFuelLevel(level)}
                      className={`flex-1 py-2 rounded-md text-xs font-medium ${
                        fuelLevel === level
                          ? 'bg-primary text-white shadow-md'
                          : 'hover:bg-white dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Section: Servicios --> */}
          <section className="mt-6 px-4">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="text-primary text-[20px]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Servicios Solicitados
              </h2>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {services.map(({ id, name }) => (
                  <label
                    className="flex items-center p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    key={id}
                  >
                    <input
                      className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-700 dark:border-slate-600"
                      type="checkbox"
                      value={id}
                    />
                    <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                      {name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </section>
          {/* <!-- Section: Detalles Finales --> */}
          <section className="mt-6 px-4">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardPen className="text-primary text-[20px]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Detalles Finales
              </h2>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden p-4 space-y-4">
              {/* <!-- Mecanico --> */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Mecánico Responsable
                </label>
                <div className="relative">
                  <select className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white">
                    <option value="">Seleccionar Mecánico</option>
                    {mechanics.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                    <ChevronDown className="text-[20px]" />
                  </div>
                </div>
              </div>
              {/* <!-- Observaciones --> */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Observaciones Extras
                </label>
                <textarea
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white resize-none"
                  placeholder="Detalles de raspones, ruidos específicos, etc."
                  rows={4}
                ></textarea>
              </div>
            </div>
          </section>
          {/* <!-- Sticky Bottom Action --> */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-[#101822]/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-40 max-w-lg mx-auto">
            <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
              <Save />
              Crear Boleta de Servicio
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
