import { AuthError, PostgrestError } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  user_id: string;
  clinic_name: string;
  owner_name: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export type ProfileInsert = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;

export interface SignUpData {
  clinic_name: string;
  owner_name: string;
  phone: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  error: AuthError | PostgrestError | null;
  success?: boolean;
  message?: string;
}

export const AUTH_ERRORS = {
  INVALID_EMAIL: 'Invalid email',
  WEAK_PASSWORD: 'Password should be at least 6 characters',
  EMAIL_IN_USE: 'Email already registered',
  INVALID_CREDENTIALS: 'Invalid login credentials',
  NETWORK_ERROR: 'Network error. Please try again.',
  PROFILE_CREATE_ERROR: 'Error creating user profile',
} as const; 