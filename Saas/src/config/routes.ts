export const ROUTES = {
  // Rotas públicas
  PUBLIC: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    EMAIL_CONFIRMATION: '/auth/callback',
  },
  
  // Rotas do dashboard
  DASHBOARD: {
    ROOT: '/dashboard',
    HOME: '/dashboard/home',
    
    // Pacientes
    PATIENTS: {
      LIST: '/dashboard/patients',
      NEW: '/dashboard/patients/new',
      DETAILS: '/dashboard/patients/:id',
      EDIT: '/dashboard/patients/:id/edit',
    },
    
    // Tutores
    TUTORS: {
      LIST: '/dashboard/tutors',
      NEW: '/dashboard/tutors/new',
      DETAILS: '/dashboard/tutors/:id',
      EDIT: '/dashboard/tutors/:id/edit',
    },
    
    // Consultas
    APPOINTMENTS: {
      LIST: '/dashboard/appointments',
      NEW: '/dashboard/appointments/new',
      DETAILS: '/dashboard/appointments/:id',
      CALENDAR: '/dashboard/appointments/calendar',
    },
    
    // Veterinários
    VETERINARIANS: {
      LIST: '/dashboard/veterinarians',
      NEW: '/dashboard/veterinarians/new',
      DETAILS: '/dashboard/veterinarians/:id',
      SCHEDULE: '/dashboard/veterinarians/:id/schedule',
    },
    
    // Configurações
    SETTINGS: {
      ROOT: '/dashboard/settings',
      PROFILE: '/dashboard/settings/profile',
      CLINIC: '/dashboard/settings/clinic',
      USERS: '/dashboard/settings/users',
    },
  },
} as const;

// Tipo para as rotas
export type Routes = typeof ROUTES;

// Helper para criar URLs com parâmetros
export const createUrl = (path: string, params: Record<string, string> = {}) => {
  let url = path;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value);
  });
  return url;
};
