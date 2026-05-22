import { useState } from 'react';
import api from '../api/axios';
import type {
  RegisterPayload,
  ApiErrorResponse,
  LoginPayload,
  VerifyOtpPayload,
  ResendOtpPayload,
} from '../types/auth.types';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    payload: RegisterPayload
  ): Promise<{ success: boolean; message: string; token?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/admin/register', payload);

      const message: string =
        response.data?.message ?? 'Account created successfully!';

      const token = response.data?.data?.token;

      return {
        success: true,
        message,
        token,
      };
    } catch (err: unknown) {
      const message =
        (err as ApiErrorResponse)?.response?.data?.message ??
        'Registration failed. Please try again.';

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};


export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    payload: LoginPayload
  ): Promise<{
    success: boolean;
    message: string;
    token?: string;
    data?: unknown;
  }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/admin/login', payload);

      const message =
        response.data?.message ?? 'Login successful';

      const token = response.data?.data?.token;

      // Save token immediately
      if (token) {
        localStorage.setItem('token', token);
      }

      // Save user data if available
      localStorage.setItem(
        'auth_user',
        JSON.stringify(response.data?.data)
      );

      return {
        success: true,
        message,
        token,
        data: response.data?.data,
      };
    } catch (err: unknown) {
      const message =
        (err as ApiErrorResponse)?.response?.data?.message ??
        'Login failed. Please try again.';

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};

export const useVerifyOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyOtp = async (
    payload: VerifyOtpPayload
  ): Promise<{ success: boolean; message: string; data?: unknown }> => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await api.post('/admin/verify-otp', payload, {
        headers,
      });

      const message =
        response.data?.message ?? 'OTP verification successful';

      return {
        success: true,
        message,
        data: response.data?.data,
      };
    } catch (err: unknown) {
      const message =
        (err as ApiErrorResponse)?.response?.data?.message ??
        'OTP verification failed. Please try again.';

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { verifyOtp, isLoading, error };
};

export const useResendToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resendToken = async (
    payload: ResendOtpPayload
  ): Promise<{ success: boolean; message: string; data?: unknown }> => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await api.post('/admin/resend-otp', payload, {
        headers,
      });

      const message =
        response.data?.message ?? 'OTP resend request successful';

      return {
        success: true,
        message,
        data: response.data?.data,
      };
    } catch (err: unknown) {
      const message =
        (err as ApiErrorResponse)?.response?.data?.message ??
        'Resend OTP failed. Please try again.';

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { resendToken, isLoading, error };
};
