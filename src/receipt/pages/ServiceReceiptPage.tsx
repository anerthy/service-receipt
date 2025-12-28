// import { AdvancedFiltered } from '../components/AdvancedFiltered';
// import { ReceiptStatus } from '../components/ReceiptStatus';
import { Link } from 'react-router';
import { ServiceReceiptList } from '../components/ServiceReceiptList';
import { TopHeader } from '../components/TopHeader';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const ServiceReceiptPage = () => {
  return (
    <>
      <TopHeader />
      <div className="px-4 py-3 bg-background-light dark:bg-background-dark z-10">
        <label className="flex flex-col w-full">
          <div className="flex w-full items-center rounded-xl bg-white dark:bg-card-dark shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-12 transition-all focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary">
            <div className="flex items-center justify-center pl-4 text-slate-400 dark:text-slate-500">
              <Search />
            </div>
            {/* <Input
              className="flex-1 w-full border-none bg-transparent px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 text-base"
              placeholder="Buscar cliente, placa..."
            /> */}
            <Input
              className="flex-1 w-full border-none bg-transparent px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:ring-0 text-base"
              placeholder="Buscar cliente, placa..."
            />
            <button className="pr-4 text-primary font-medium text-sm">
              <SlidersHorizontal />
            </button>
          </div>
        </label>
      </div>
      {/* <AdvancedFiltered /> */}
      {/* <ReceiptStatus /> */}

      <ServiceReceiptList />

      <Link to={'/new-service-receipt'}>
        <div className="absolute bottom-6 right-6 z-30">
          <button className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary text-white hover:bg-blue-600">
            <Plus className="text-[28px]" />
          </button>
        </div>
      </Link>
    </>
  );
};
