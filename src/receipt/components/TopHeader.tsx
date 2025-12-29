import { Menu } from 'lucide-react';
import { Link } from 'react-router';

export const TopHeader = () => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light dark:bg-background-dark px-4 py-3 border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white">
          <Menu />
        </button>
        <Link to="/dashboard">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Taller Mejías
          </h1>
        </Link>
      </div>
      <div className="flex items-center">
        {/* <button className="relative flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button> */}
        <Link to="/dashboard">
          <div className="ml-2 h-8 w-8 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700">
            <img
              className="h-full w-full object-cover"
              data-alt="User profile avatar gradient"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpELPa60P_CfXis028ckC3AVkbEXbK4s64Pfmr50GtR1IIy6mcBoXABjYtao-uj1wq4aaA7hVPn6A9f4Bqq_IFkprZIAt4jgLab57fe9MNQmPgGCNsu-5cYUznAkZpLlDV1fmAHx9NRe4-h4HQIG5U5UkCEmPCMF3Cj7glcdywV4eJ29ak6GTC7tw1eynMJ3McueYIACxzCQAHl4hVv9H7OzJCH4q3W8GJt3_nliRha05bQXw6WrK7CLjwHZt1MwD-Ye5s4oJY"
            />
          </div>
        </Link>
      </div>
    </header>
  );
};
