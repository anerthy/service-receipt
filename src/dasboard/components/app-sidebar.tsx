import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Link } from 'react-router';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { NavUser } from './nav-user';

// This is sample data.
const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Mantenimiento',
      url: '/dashboard',
      items: [
        {
          title: 'Servicios',
          url: '/dashboard/services',
        },
        {
          title: 'Mecánicos',
          url: '/dashboard/mechanics',
        },
      ],
    },
    {
      title: 'Configuraciones',
      url: '/dashboard',
      items: [
        {
          title: 'Clientes',
          url: '/dashboard/customers',
          isActive: true,
        },
        {
          title: 'Vehículos',
          url: '/dashboard/vehicles',
        },
        {
          title: 'Mantenimientos',
          url: '/dashboard/service-receipts',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        Taller Mejías
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="flex gap-1">
              <Menu />
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser
          user={{
            email: user?.email || '',
            name: user?.id.substring(0, 8) || 'unknown user',
            avatar: 'https://placehold.co/600x400/transparent/F00?text=P',
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
