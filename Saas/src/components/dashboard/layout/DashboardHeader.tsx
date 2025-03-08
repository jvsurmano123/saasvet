import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme as useMuiTheme,
} from '@mui/material';
import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../../services/auth.service';
import { useAuth } from '../../../contexts/AuthContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme as useCustomTheme } from '../../../contexts/ThemeContext';

interface DashboardHeaderProps {
  open: boolean;
  onDrawerToggle: () => void;
  drawerWidth: number;
  children?: ReactNode;
}

export function DashboardHeader({ open, drawerWidth, children }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleTheme, isDarkMode } = useCustomTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useMuiTheme();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await AuthService.signOut();
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/dashboard/settings/profile');
    handleCloseMenu();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        width: { md: `calc(100% - ${open ? drawerWidth : 0}px)` },
        ml: { md: `${open ? drawerWidth : 0}px` },
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        {children}

        <Box sx={{ flexGrow: 1 }} />
        
        <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
          {/* Botão de tema */}
          <Tooltip title={isDarkMode ? 'Modo claro' : 'Modo escuro'}>
            <IconButton onClick={toggleTheme} size="small" color="inherit">
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {/* Botão de notificações */}
          <Tooltip title="Notificações">
            <IconButton size="small" color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          {/* Menu do usuário */}
          <Box>
            <Tooltip title="Configurações da conta">
              <IconButton onClick={handleOpenMenu} size="small">
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  alt={user?.user_metadata?.clinic_name || 'User'}
                >
                  {user?.user_metadata?.clinic_name?.charAt(0) || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              onClick={handleCloseMenu}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2" noWrap>
                  {user?.user_metadata?.clinic_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {user?.email}
                </Typography>
              </Box>
              <MenuItem onClick={handleProfile}>Meu Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
} 