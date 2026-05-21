import { useState } from 'react';
import api from '../api/axios';


export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}


export const useAuth = () => {
  return {};
};


export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    payload: RegisterPayload
  ): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/admin/register', payload);
      const message: string =
        response.data?.message ?? 'Account created successfully!';
      return { success: true, message };
    } catch (err: unknown) {
      const message =
        (err as ApiErrorResponse)?.response?.data?.message ??
        'Registration failed. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
