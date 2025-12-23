import { ServiceReceiptCard } from './ServiceReceiptCard';

export const DateSeparator = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center py-2">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </p>
      <div className="ml-3 h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
    </div>
  );
};

export const ServiceReceiptList = () => {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24 pt-2 space-y-3">
      <DateSeparator label="Hoy" />
      <ServiceReceiptCard
        receptionDate={new Date()}
        id={'BLT-1014'}
        status={'En Progreso'}
        plate={'ABC-123'}
        customerName={'Juan Pérez'}
        model={'Yamaha MT-03'}
        mechanicName={'Roberto Gómez'}
      />
      <ServiceReceiptCard
        receptionDate={new Date()}
        id={'BLT-1014'}
        status={'Listo'}
        plate={'ABC-123'}
        customerName={'Juan Pérez'}
        model={'Yamaha MT-03'}
        mechanicName={'Roberto Gómez'}
      />

      <DateSeparator label="Ayer" />

      <ServiceReceiptCard
        receptionDate={new Date()}
        id={'BLT-1014'}
        status={'Pendiente'}
        plate={'ABC-123'}
        customerName={'Juan Pérez'}
        model={'Yamaha MT-03'}
        mechanicName={'Roberto Gómez'}
      />

      <ServiceReceiptCard
        receptionDate={new Date()}
        id={'BLT-1014'}
        status={'En entregado'}
        plate={'ABC-123'}
        customerName={'Juan Pérez'}
        model={'Yamaha MT-03'}
        mechanicName={'Roberto Gómez'}
      />
    </div>
  );
};
