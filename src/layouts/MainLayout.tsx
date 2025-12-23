import type { PropsWithChildren } from 'react';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    // max-w-md
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark mx-auto shadow-2xl overflow-hidden">
      {children}
    </div>
  );
};
