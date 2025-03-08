import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from './styles/theme';
import { ROUTES } from './config/routes';
import { PublicLayout } from './components/layout/PublicLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { EmailConfirmationPage } from './pages/auth/EmailConfirmationPage';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/dashboard/layout/DashboardLayout';
import { HomePage } from './pages/dashboard/home/HomePage';
import './styles/globals.css';

function AppContent() {
  const { isDarkMode } = useTheme();
  const theme = createAppTheme(isDarkMode);

  return (
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

            {/* Rotas protegidas do dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Outlet />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<HomePage />} />
              {/* Outras rotas do dashboard serão adicionadas aqui */}
            </Route>
          </Routes>
        </AuthProvider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
