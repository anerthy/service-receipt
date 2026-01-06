import { supabase } from '@/lib/supabase';

export const useUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const metadata = user?.user_metadata;

  return { user, metadata };
};
