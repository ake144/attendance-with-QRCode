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
      console.log('Checking authentication...');
      const response = await apiClient.me();
      
      if (response.user && response.user.id) {
        console.log('Auth check successful:', response.user.id);
        set({ 
          user: response.user, 
          isAuthenticated: true, 
          loading: false 
        });
      } else {
        console.log('Auth check failed: User object is invalid');
        set({ 
          user: null, 
          isAuthenticated: false, 
          loading: false 
        });
      }
    } catch (error) {
      console.log('Auth check failed:', error instanceof Error ? error.message : 'Unknown error');
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
      console.log('Attempting login with data:', data);
      const response = await apiClient.login(data);
      
      if (response.user && response.user.id) {
        console.log('Login successful:', response.user.id);
        set({ 
          user: response.user, 
          isAuthenticated: true, 
          loading: false 
        });
      } else {
        console.log('Login failed: Invalid user response');
        throw new Error('Invalid user response from server');
      }
    } catch (error) {
      console.log('Login failed:', error instanceof Error ? error.message : 'Unknown error');
      set({ loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      console.log('Attempting logout...');
      await apiClient.logout();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false 
      });
    }
  },
})); 