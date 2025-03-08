import { supabase } from '../lib/supabase';
import { SignUpData, AuthResponse, AUTH_ERRORS } from '../types/supabase';

export class AuthService {
  static async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      // Validar e-mail
      if (!this.isValidEmail(data.email)) {
        return {
          error: { message: AUTH_ERRORS.INVALID_EMAIL } as any,
          success: false,
        };
      }

      // Validar senha
      if (data.password.length < 6) {
        return {
          error: { message: AUTH_ERRORS.WEAK_PASSWORD } as any,
          success: false,
        };
      }

      // Criar usuário usando autenticação nativa do Supabase
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            clinic_name: data.clinic_name,
            owner_name: data.owner_name,
            phone: data.phone.replace(/\D/g, ''),
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          return {
            error: { message: AUTH_ERRORS.EMAIL_IN_USE } as any,
            success: false,
          };
        }
        return { error: signUpError, success: false };
      }

      return {
        error: null,
        success: true,
        message: 'Conta criada com sucesso! Por favor, verifique seu e-mail para confirmar seu cadastro.',
      };
    } catch (error) {
      console.error('Erro no registro:', error);
      return {
        error: { message: AUTH_ERRORS.NETWORK_ERROR } as any,
        success: false,
      };
    }
  }

  static async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          return {
            error: { message: 'Por favor, confirme seu e-mail antes de fazer login.' } as any,
            success: false,
          };
        }
        return {
          error: { message: AUTH_ERRORS.INVALID_CREDENTIALS } as any,
          success: false,
        };
      }

      return {
        error: null,
        success: true,
        data: data.user,
        message: 'Login realizado com sucesso!',
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        error: { message: AUTH_ERRORS.NETWORK_ERROR } as any,
        success: false,
      };
    }
  }

  static async verifyEmail(token: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      });

      if (error) {
        return {
          error: { message: 'Erro ao verificar e-mail. O link pode ter expirado.' } as any,
          success: false,
        };
      }

      return {
        error: null,
        success: true,
        message: 'E-mail verificado com sucesso! Você já pode fazer login.',
      };
    } catch (error) {
      return {
        error: { message: 'Erro ao processar verificação de e-mail.' } as any,
        success: false,
      };
    }
  }

  static async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }

  static async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return {
          error: { message: 'Erro ao enviar e-mail de recuperação de senha.' } as any,
          success: false,
        };
      }

      return {
        error: null,
        success: true,
        message: 'E-mail de recuperação de senha enviado com sucesso!',
      };
    } catch (error) {
      return {
        error: { message: AUTH_ERRORS.NETWORK_ERROR } as any,
        success: false,
      };
    }
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
} 