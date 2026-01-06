import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router';
import { signInWithGoogle, singIn } from '@/auth/services/auth.services';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';

export function LoginPage() {
  const navigate = useNavigate();
  const [isPosting, setIsPosting] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPosting(true);

    const formData = new FormData(event.target as HTMLFormElement);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log(email, password);
    if (!email || !password) {
      setIsPosting(false);
      return;
    }

    try {
      const { user } = await singIn(email, password);

      if (user.id) {
        navigate('/dashboard');
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleLogin}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Inicia sesión</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Completa el formulario para iniciar sesión
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            required
          />
        </Field>

        <Field>
          <Button type="submit" disabled={isPosting}>
            Iniciar sesión
          </Button>
        </Field>
        <FieldSeparator>O continúa con</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            onClick={async () => await signInWithGoogle()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Google
          </Button>
          <FieldDescription className="px-6 text-center">
            ¿No tienes una cuenta? <Link to="/auth/register">Crea una</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
