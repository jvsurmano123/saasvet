import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  Grid,
  Alert,
} from '@mui/material';
import { ROUTES } from '../../config/routes';
import { useAuth } from '../../contexts/AuthContext';
import { SignUpData } from '../../types/supabase';
import styled from 'styled-components';

const RegisterCard = styled(Card)`
  width: 100%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

interface RegisterFormData extends SignUpData {
  confirmPassword: string;
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    clinic_name: '',
    owner_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const validateForm = () => {
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    // Validação básica de telefone (aceita formatos: (99) 99999-9999 ou 99999999999)
    const phoneRegex = /^(\(\d{2}\) ?\d{5}-\d{4}|\d{11})$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      setError('Telefone inválido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { error, success, message } = await signUp({
        clinic_name: formData.clinic_name,
        owner_name: formData.owner_name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (success) {
        // Redireciona para o login com mensagem de sucesso
        navigate(ROUTES.PUBLIC.LOGIN, {
          state: { message: message || 'Conta criada com sucesso! Faça login para continuar.' }
        });
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
      console.error('Erro inesperado:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  // Formata o telefone enquanto o usuário digita
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      let formatted = numbers;
      if (numbers.length > 2) {
        formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      }
      if (numbers.length > 7) {
        formatted = formatted.slice(0, 10) + '-' + formatted.slice(10);
      }
      return formatted;
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    setError(null);
  };

  return (
    <Box className="fade-in">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Crie sua conta
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Comece a gerenciar sua clínica veterinária hoje mesmo
      </Typography>

      <RegisterCard>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Nome da Clínica"
              name="clinic_name"
              value={formData.clinic_name}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Nome do Responsável"
              name="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(99) 99999-9999"
                  required
                  disabled={loading}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Senha"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirmar Senha"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Já tem uma conta?{' '}
                <Link
                  component={RouterLink}
                  to={ROUTES.PUBLIC.LOGIN}
                  color="primary"
                  sx={{ textDecoration: 'none' }}
                >
                  Faça login
                </Link>
              </Typography>
            </Box>
          </Form>
        </CardContent>
      </RegisterCard>
    </Box>
  );
} 