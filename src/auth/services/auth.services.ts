import { supabase } from '@/lib/supabase';

export const singIn = async (username: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  });
  if (error) {
    throw error;
  }

  return data;
};

export const signInWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  } catch (error) {
    console.log({ error });
    alert('Error al iniciar sesión');
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};
