import { create } from 'zustand';
import { apiClient } from '../lib/api-client';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: { email?: string; phone?: string; name?: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  isAuthenticated: false,

  setLoading: (loading: boolean) => set({ loading }),

  checkAuth: async () => {
    try {
      const response = await apiClient.me();
      set({ 
        user: response.user, 
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false 
      });
    }
  },

  login: async (data: { email?: string; phone?: string; name?: string }) => {
    set({ loading: true });
    try {
      const response = await apiClient.login(data);
      set({ 
        user: response.user, 
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false 
      });
    }
  },
})); 