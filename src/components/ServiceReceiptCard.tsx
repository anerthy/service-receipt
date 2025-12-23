interface Props {
  id: string;
  status: string;
  plate: string;
  customerName: string;
  receptionDate: Date;
  model: string;
  mechanicName: string;
}

export const ServiceReceiptCard = (props: Props) => {
  const {
    id,
    status,
    plate,
    customerName,
    receptionDate,
    model,
    mechanicName,
  } = props;

  const statusColors = {
    'En Progreso':
      'text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400',
    Listo:
      'text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400',
    Entregado:
      'text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400',
    Pendiente:
      'text-slate-600 ring-1 ring-inset ring-slate-500/10 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-500/30',
  };

  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl bg-white dark:bg-card-dark p-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium ${
              statusColors[status as keyof typeof statusColors]
            }`}
          >
            {status}
          </span>

          <span className="text-xs font-medium text-slate-400">#{id}</span>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {receptionDate.toLocaleTimeString()}
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
          <img
            className="h-full w-full object-cover"
            data-alt="Portrait of Juan Perez"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAobfCsGBiGSCj6NZm3gg9t1HibD7iqDF2N2r3j_zw7kVfomtt1UN-XoK8xODL07gDvNLEJyB3mWZdkybOdJOPffTUFqk4dQxFTqG6pNttvBY7sTxlpwzqZudpKL6i4ERhOFpDwLxhxN164xTp7W568RUBOsaq_9rXQoriMGIPtXNL2ll1wJumo_kWFo3J9QeV0Pwk-a4HkvFUYKMkWtZ2Pf8xduXc95MN7U2PytoR0avbpBC8Vqh4xiOYOcXk6fh6inPYrFwTv"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
            {customerName}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-sm text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-[16px]">
              two_wheeler
            </span>
            <span>{model}</span>
            <span className="mx-1">•</span>
            <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">
              {plate}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
        <span className="material-symbols-outlined text-[16px] text-slate-400">
          engineering
        </span>
        <span>Mecánico: {mechanicName}</span>
      </div>
      <div className="mt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-3">
        <span className="text-xs text-slate-400">
          Ingreso: {receptionDate.toLocaleDateString()}
        </span>
        <button className="flex items-center text-sm font-medium text-primary hover:text-blue-700 dark:hover:text-blue-400">
          Ver Detalles{' '}
          <span className="material-symbols-outlined text-[18px] ml-1">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
};
