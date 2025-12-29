import { create } from 'zustand';
import { signOut } from '../services/auth.services';

// TODO: Usar en vez de AuthProvider + useAuth

type User = {
  id: string;
  email: string;
  // Agrega otros campos relevantes del usuario según sea necesario
};

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
  user: User | null;
  status: AuthStatus;
  register(name: string, email: string, password: string): Promise<boolean>;
  login(email: string, password: string): Promise<boolean>;
  logout(): Promise<void>;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  status: 'checking',
  async register(name: string, email: string, password: string) {
    console.log({ name, email, password });

    return false;
  },
  async login(email: string, password: string) {
    console.log({ email, password });
    localStorage.setItem('token', 'mock-token');
    set({
      user: { id: '96262ddd-3349-4075-ac3c-16c21d5f6597', email },
      status: 'authenticated',
    });
    return true;
  },
  async logout() {
    localStorage.removeItem('token');
    set({
      user: null,
      status: 'not-authenticated',
    });
    await signOut();
  },
}));
