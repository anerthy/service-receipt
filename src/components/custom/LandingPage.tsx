import { Link } from 'react-router';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/use-auth';
import { signOut } from '@/auth/services/auth.services';

export const LandingPage = () => {
  const { session } = useAuth();
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20 mb-10">
        <Link to="/dashboard">
          <h1 className="text-3xl font-bold">Taller Mejias</h1>
        </Link>
        {!session && (
          <Link to="/auth/login" className="mt-4">
            <Button className="w-32">Sign in</Button>
          </Link>
        )}

        {session && (
          <Button
            variant={'destructive'}
            className="w-32"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </>
  );
};
