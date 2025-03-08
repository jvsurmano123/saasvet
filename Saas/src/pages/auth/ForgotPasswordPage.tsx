import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

const ForgotPasswordCard = styled(Card)`
  width: 100%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de recuperação de senha
    console.log('Recuperar senha:', email);
    setIsSubmitted(true);
  };

  return (
    <Box className="fade-in">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Recuperar Senha
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Digite seu e-mail para receber as instruções
      </Typography>

      <ForgotPasswordCard>
        <CardContent>
          {isSubmitted ? (
            <Box>
              <Alert severity="success" sx={{ mb: 2 }}>
                E-mail enviado com sucesso! Verifique sua caixa de entrada.
              </Alert>
              <Typography variant="body2" color="text.secondary" align="center">
                Não recebeu o e-mail?{' '}
                <Link
                  component="button"
                  color="primary"
                  onClick={() => setIsSubmitted(false)}
                  sx={{ textDecoration: 'none' }}
                >
                  Tentar novamente
                </Link>
              </Typography>
            </Box>
          ) : (
            <Form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Enviar Instruções
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
          )}
        </CardContent>
      </ForgotPasswordCard>
    </Box>
  );
} 