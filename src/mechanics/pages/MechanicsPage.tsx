import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import type { Mechanic } from '@/interfaces';
import { Plus } from 'lucide-react';
import { Link } from 'react-router';

const mechanics: Mechanic[] = [
  {
    id: '43455',
    dni: '987654',
    name: 'Carlos Perez',
    email: 'carlos.perez@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    is_active: true,
  },
  {
    id: '12335366',
    dni: '592940',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    is_active: false,
  },
];

export function MechanicsPage() {
  return (
    <div className="flex w-full  flex-col gap-6">
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input type="email" placeholder="Buscar por nombre..." />
        <Link to="/dashboard/mechanics/new">
          <Button type="submit" variant="outline">
            <Plus />
            Nuevo
          </Button>
        </Link>
      </div>

      <ItemGroup className="gap-4">
        {mechanics.map((mechanic) => (
          <Item key={mechanic.id} variant="outline" asChild role="listitem">
            <Link to={`/dashboard/mechanics/${mechanic.id}`}>
              <ItemMedia variant="image">
                <img
                  src={`https://placehold.co/600x400?text=${mechanic.name.substring(
                    0,
                    1
                  )}`}
                  alt={mechanic.name}
                  width={32}
                  height={32}
                  className="object-cover grayscale"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1">
                  {mechanic.name} -{' '}
                  <span className="text-muted-foreground">{mechanic.id}</span>
                </ItemTitle>
                <ItemDescription>{mechanic.email}</ItemDescription>
              </ItemContent>
              <ItemContent className="flex-none text-center">
                <ItemDescription>
                  <Badge
                    variant={mechanic.is_active ? 'default' : 'destructive'}
                  >
                    {mechanic.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </ItemDescription>
              </ItemContent>
            </Link>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
