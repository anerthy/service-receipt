import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router';

interface Props {
  title: string;
  description: string;
  to?: string;
}

export const AdminHeader = ({ title, description, to }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="mb-2">
          <h1 className="text-2xl font-bold  mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {to && (
          <div className="flex justify-end mb-10 gap-4">
            <Link
              to={to}
              className="mb-4 inline-block text-blue-600 hover:underline"
            >
              <Button>
                <Plus />
                Nuevo
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
