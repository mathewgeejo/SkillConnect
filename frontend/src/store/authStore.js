import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Register
      register: async (userData) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/register', userData);
          set({
            user: data.data,
            isAuthenticated: true,
            isLoading: false,
          });
          toast.success('Registration successful!');
          return data.data;
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Registration failed';
          toast.error(message);
          throw error;
        }
      },

      // Login
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/login', credentials);
          set({
            user: data.data,
            isAuthenticated: true,
            isLoading: false,
          });
          toast.success('Login successful!');
          return data.data;
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Login failed';
          toast.error(message);
          throw error;
        }
      },

      // Logout
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
        toast.success('Logged out successfully');
      },

      // Get current user
      getCurrentUser: async (userId) => {
        try {
          const { data } = await api.get(`/auth/me/${userId}`);
          set({ user: data.data });
          return data.data;
        } catch (error) {
          set({ user: null, isAuthenticated: false });
          throw error;
        }
      },

      // Update profile
      updateProfile: async (profileData) => {
        try {
          const userId = get().user?._id;
          if (!userId) throw new Error('User not logged in');
          const { data } = await api.put(`/auth/update-profile/${userId}`, profileData);
          set({ user: data.data });
          toast.success('Profile updated successfully');
          return data.data;
        } catch (error) {
          const message = error.response?.data?.message || 'Update failed';
          toast.error(message);
          throw error;
        }
      },

      // Update password
      updatePassword: async (passwordData) => {
        try {
          const userId = get().user?._id;
          if (!userId) throw new Error('User not logged in');
          await api.put(`/auth/update-password/${userId}`, passwordData);
          toast.success('Password updated successfully');
        } catch (error) {
          const message = error.response?.data?.message || 'Password update failed';
          toast.error(message);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
