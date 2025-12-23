import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    // max-w-md
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark mx-auto shadow-2xl overflow-hidden">
      <Outlet />
    </div>
  );
};

export default MainLayout;
