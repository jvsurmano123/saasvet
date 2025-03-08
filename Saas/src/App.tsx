import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import { ROUTES } from './config/routes';
import { PublicLayout } from './components/layout/PublicLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { EmailConfirmationPage } from './pages/auth/EmailConfirmationPage';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Routes>
              {/* Rota raiz redireciona para login */}
              <Route
                path="/"
                element={<Navigate to={ROUTES.PUBLIC.LOGIN} replace />}
              />

              {/* Rotas públicas */}
              <Route element={<PublicLayout />}>
                <Route path={ROUTES.PUBLIC.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.PUBLIC.REGISTER} element={<RegisterPage />} />
                <Route path={ROUTES.PUBLIC.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
                <Route path={ROUTES.PUBLIC.RESET_PASSWORD} element={<ResetPasswordPage />} />
              </Route>

              {/* Rota de confirmação de e-mail */}
              <Route
                path={ROUTES.PUBLIC.EMAIL_CONFIRMATION}
                element={<EmailConfirmationPage />}
              />

              {/* Rotas protegidas */}
              <Route
                path={ROUTES.DASHBOARD.ROOT}
                element={
                  <ProtectedRoute>
                    {/* DashboardLayout será adicionado aqui */}
                    <div>Dashboard (em construção)</div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
