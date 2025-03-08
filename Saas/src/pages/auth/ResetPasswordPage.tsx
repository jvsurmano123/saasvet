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
  Alert,
} from '@mui/material';
import { ROUTES } from '../../config/routes';
import styled from 'styled-components';

const ResetPasswordCard = styled(Card)`
  width: 100%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validação básica
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    // TODO: Implementar lógica de redefinição de senha
    console.log('Redefinir senha:', formData);

    // Redirecionar para o login após sucesso
    navigate(ROUTES.PUBLIC.LOGIN);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  return (
    <Box className="fade-in">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Redefinir Senha
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Digite sua nova senha
      </Typography>

      <ResetPasswordCard>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Nova Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Confirmar Nova Senha"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Redefinir Senha
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Lembrou sua senha?{' '}
                <Link
                  component={RouterLink}
                  to={ROUTES.PUBLIC.LOGIN}
                  color="primary"
                  sx={{ textDecoration: 'none' }}
                >
                  Voltar ao login
                </Link>
              </Typography>
            </Box>
          </Form>
        </CardContent>
      </ResetPasswordCard>
    </Box>
  );
} 