import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  Alert,
} from '@mui/material';
import { ROUTES } from '../../config/routes';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

interface LocationState {
  from?: {
    pathname: string;
  };
  message?: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const locationState = location.state as LocationState;
  const from = locationState?.from?.pathname || ROUTES.DASHBOARD.ROOT;

  useEffect(() => {
    // Verifica se há mensagem de sucesso no estado da navegação
    if (locationState?.message) {
      setSuccess(locationState.message);
      // Limpa o estado para não mostrar a mensagem novamente após refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        setError('E-mail ou senha inválidos');
        return;
      }

      // Redireciona para a página que o usuário tentou acessar ou para o dashboard
      navigate(from, { replace: true });
    } catch (err) {
      setError('Ocorreu um erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  return (
    <Box className="fade-in">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Bem-vindo(a) de volta!
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Faça login para acessar sua conta
      </Typography>

      <LoginCard>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

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
            
            <Link
              component={RouterLink}
              to={ROUTES.PUBLIC.FORGOT_PASSWORD}
              color="primary"
              align="right"
              sx={{ textDecoration: 'none' }}
            >
              Esqueceu sua senha?
            </Link>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Não tem uma conta?{' '}
                <Link
                  component={RouterLink}
                  to={ROUTES.PUBLIC.REGISTER}
                  color="primary"
                  sx={{ textDecoration: 'none' }}
                >
                  Cadastre-se
                </Link>
              </Typography>
            </Box>
          </Form>
        </CardContent>
      </LoginCard>
    </Box>
  );
} 