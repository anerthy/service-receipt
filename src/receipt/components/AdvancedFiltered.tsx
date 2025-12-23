export const AdvancedFiltered = () => {
  return (
    <div className="px-4 pb-2">
      <details className="group">
        <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
          <span>Filtros avanzados</span>
          <span className="material-symbols-outlined transform group-open:rotate-180 transition-transform">
            expand_more
          </span>
        </summary>
        <div className="bg-white dark:bg-card-dark rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4 mb-2 animate-fade-in-down">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Rango de Fechas
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <input
                  className="w-full text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-primary focus:border-primary"
                  placeholder="Desde"
                  type="date"
                />
              </div>
              <div className="relative">
                <input
                  className="w-full text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-primary focus:border-primary"
                  placeholder="Hasta"
                  type="date"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Mecánico
            </label>
            <select className="w-full text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-primary focus:border-primary">
              <option value="">Todos los mecánicos</option>
              <option value="1">Roberto Gómez</option>
              <option value="2">Ana Sánchez</option>
              <option value="3">Luis Martinez</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Tipo de Servicio
            </label>
            <select className="w-full text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-primary focus:border-primary">
              <option value="">Cualquier servicio</option>
              <option value="preventivo">Mantenimiento Preventivo</option>
              <option value="correctivo">Mantenimiento Correctivo</option>
              <option value="aceite">Cambio de Aceite</option>
              <option value="frenos">Revisión de Frenos</option>
            </select>
          </div>
          <div className="flex justify-end pt-2">
            <button className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full">
              Aplicar Filtros
            </button>
          </div>
        </div>
      </details>
    </div>
  );
};
