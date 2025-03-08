import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    'Variável de ambiente VITE_SUPABASE_URL não encontrada. ' +
    'Verifique se você criou o arquivo .env.local com as credenciais do Supabase.'
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    'Variável de ambiente VITE_SUPABASE_ANON_KEY não encontrada. ' +
    'Verifique se você criou o arquivo .env.local com as credenciais do Supabase.'
  );
}

// Validar se a URL é válida
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    `URL do Supabase inválida: ${supabaseUrl}. ` +
    'Verifique se você configurou corretamente a variável VITE_SUPABASE_URL no arquivo .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 