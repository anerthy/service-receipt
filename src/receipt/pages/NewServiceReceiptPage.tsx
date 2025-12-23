import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { Customer, Mechanic, Service } from '../../../interfaces';

export const NewServiceReceiptPage = () => {
  const FUEL_LEVELS = ['E', '1/4', '1/2', '3/4', 'F'];

  const [services, setServices] = useState<Service[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [customer, setCustomer] = useState<Customer>({} as Customer);

  const customerDNIRef = useRef<HTMLInputElement>(null);

  const [fuelLevel, setFuelLevel] = useState<keyof typeof FUEL_LEVELS>();

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

  useEffect(() => {
    async function getServices() {
      const { data } = await supabase
        .from('services')
        .select()
        .order('name', { ascending: true });

      const services = data as Service[] | [];

      if (services.length === 0) return;

      setServices(services);
    }

    async function getMechanics() {
      const { data, error } = await supabase
        .from('mechanics')
        .select()
        .order('name', { ascending: true })
        .limit(1);

      if (error) {
        console.log('Error fetching mechanics:', error.message);
        return;
      }

      const mechanics = data as Mechanic[] | [];

      if (mechanics.length === 0) return;
      setMechanics(mechanics);
    }

    getMechanics();
    getServices();
  }, []);

  return (
    <>
      <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden transition-colors duration-200">
        {/* <!-- Sticky Header --> */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#101822]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto w-full">
            <button className="flex items-center justify-center p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-[24px]">
                close
              </span>
            </button>
            <h1 className="text-lg font-bold leading-tight tracking-tight">
              Nueva Boleta
            </h1>
            <button className="text-primary font-semibold text-base px-2 py-1 rounded hover:bg-primary/10 transition-colors">
              Guardar
            </button>
          </div>
        </header>
        <main className="relative flex flex-col w-full max-w-lg mx-auto pb-24">
          {/* <!-- Section: Datos del Cliente --> */}
          <section className="mt-4 px-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                person
              </span>
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
                        <span className="material-symbols-outlined text-[18px]">
                          search
                        </span>
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
              <span className="material-symbols-outlined text-primary text-[20px]">
                two_wheeler
              </span>
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
                        <span className="material-symbols-outlined text-[18px]">
                          search
                        </span>
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
              <span className="material-symbols-outlined text-primary text-[20px]">
                speed
              </span>
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
                  <input
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white pr-10"
                    placeholder="0"
                    type="number"
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
                  <span className="text-xs font-bold text-primary">50%</span>
                </div>
                <div className="flex w-full bg-slate-100 dark:bg-slate-900 rounded-lg p-1 gap-1">
                  {FUEL_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() =>
                        setFuelLevel(level as keyof typeof FUEL_LEVELS)
                      }
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
              <span className="material-symbols-outlined text-primary text-[20px]">
                build_circle
              </span>
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
              <span className="material-symbols-outlined text-primary text-[20px]">
                assignment
              </span>
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
                    <span className="material-symbols-outlined text-[20px]">
                      expand_more
                    </span>
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
            <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">save</span>
              Crear Boleta de Servicio
            </button>
          </div>
        </main>
      </div>
    </>
  );
};
