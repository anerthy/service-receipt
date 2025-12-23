export const ReceiptStatus = () => {
  return (
    <div className="flex gap-2 px-4 pb-2 overflow-x-auto hide-scrollbar">
      <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-primary px-4 shadow-sm transition-transform active:scale-95">
        <p className="text-white text-sm font-medium">Todos</p>
      </button>
      <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 px-4 transition-transform active:scale-95">
        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
          En Progreso
        </p>
      </button>
      <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 px-4 transition-transform active:scale-95">
        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
          Listos
        </p>
      </button>
      <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 px-4 transition-transform active:scale-95">
        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
          Entregados
        </p>
      </button>
    </div>
  );
};
