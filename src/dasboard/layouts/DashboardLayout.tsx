import { AppSidebar } from '@/dasboard/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Outlet, useLocation } from 'react-router';
import { ModeToggle } from '@/components/mode-toggle';

export const DashboardLayout = () => {
  // TODO: Refactor breadcrumb to support dynamic routes
  const { pathname } = useLocation();

  const breadcrumbs = {
    '/dashboard': 'Dashboard',
    '/dashboard/services': 'Services',
    '/dashboard/mechanics': 'Mechanics',
    '/dashboard/customers': 'Customers',
    '/dashboard/vehicles': 'Vehicles',
    '/dashboard/service-receipts': 'Service Receipts',
  };

  let breadcrumb: string = breadcrumbs[pathname];

  if (!breadcrumb) {
    if (pathname.startsWith('/dashboard/customers/')) {
      breadcrumb = 'Customer Details';
    } else if (pathname.startsWith('/dashboard/vehicles/')) {
      breadcrumb = 'Vehicle Details';
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex justify-end items-end flex-1">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
