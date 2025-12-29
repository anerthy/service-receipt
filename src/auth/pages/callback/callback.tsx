import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { supabase } from '@/lib/supabase';
// TODO: Revisar si es necesaria
export const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');

      let next = searchParams.get('next');

      if (!next || !next.startsWith('/')) {
        next = '/';
      }

      if (!code) {
        navigate('/auth/login');
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        navigate('/auth/login');
        return;
      }

      navigate(next);
    };

    handleCallback();
  }, [navigate, searchParams]);

  return <div>Procesando autenticación...</div>;
};
