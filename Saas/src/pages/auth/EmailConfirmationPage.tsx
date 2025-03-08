import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { AuthService } from '../../services/auth.service';
import { ROUTES } from '../../config/routes';

export function EmailConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token_hash');
        if (!token) {
          setError('Link de verificação inválido.');
          setLoading(false);
          return;
        }

        const { error, success, message } = await AuthService.verifyEmail(token);

        if (error) {
          setError(error.message);
        } else if (success) {
          // Redirecionar para o login após 3 segundos
          setTimeout(() => {
            navigate(ROUTES.PUBLIC.LOGIN, {
              state: { message },
            });
          }, 3000);
        }
      } catch (err) {
        setError('Erro ao processar verificação de e-mail.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
    >
      {loading ? (
        <>
          <CircularProgress size={48} sx={{ mb: 2 }} />
          <Typography variant="h6" align="center" gutterBottom>
            Verificando seu e-mail...
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            Por favor, aguarde enquanto processamos sua confirmação.
          </Typography>
        </>
      ) : error ? (
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          {error}
        </Alert>
      ) : (
        <Alert severity="success" sx={{ maxWidth: 400 }}>
          E-mail verificado com sucesso! Você será redirecionado para a página de login.
        </Alert>
      )}
    </Box>
  );
} 