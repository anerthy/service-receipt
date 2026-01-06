import { supabase } from '@/lib/supabase';

export const signUp = async (
  email: string,
  password: string,
  username: string,
  fullName: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username,
        email: email,
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error(error.code);
    throw error.message;
  }

  return data;
};

export const singIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error.code);
    throw error.message;
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
    if (error) {
      console.error(error.code);
      throw error.message;
    }
  } catch (error) {
    console.error(error);
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.code);
    throw error.message;
  }
};
