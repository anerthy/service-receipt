import { signUp } from '@/auth/services/auth.services';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

export function RegisterPage() {
  const navigate = useNavigate();
  const [isPosting, setIsPosting] = useState(false);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPosting(true);

    const formData = new FormData(event.target as HTMLFormElement);

    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!email || !fullName || !username) {
      toast.error('Por favor completa todos los campos');
      setIsPosting(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      setIsPosting(false);
      return;
    }

    try {
      const { user } = await signUp(email, password, username, fullName);

      if (user?.id) {
        navigate('/auth/login');
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
    <form className="flex flex-col gap-6" onSubmit={handleRegister}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Completa el formulario para registrarte
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="fullName">Nombre completo</FieldLabel>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            required
          />
        </Field>
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
          <FieldLabel htmlFor="username">Usuario</FieldLabel>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="username"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input id="password" name="password" type="password" required />
          <FieldDescription>Debe tener al menos 8 caracteres.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">
            Confirmar contraseña
          </FieldLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
          />
          <FieldDescription>Por favor confirma tu contraseña.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={isPosting}>
            Registrarse
          </Button>
        </Field>
        <FieldSeparator>O continúa con</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Google
          </Button>
          <FieldDescription className="px-6 text-center">
            ¿Ya tienes una cuenta? <Link to="/auth/login">Iniciar sesión</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
