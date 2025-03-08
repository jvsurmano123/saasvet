import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config/routes';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PetsIcon from '@mui/icons-material/Pets';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../../../contexts/AuthContext';

const menuItems = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD.HOME,
    icon: <DashboardIcon />,
  },
  {
    title: 'Pacientes',
    path: ROUTES.DASHBOARD.PATIENTS.LIST,
    icon: <PetsIcon />,
  },
  {
    title: 'Tutores',
    path: ROUTES.DASHBOARD.TUTORS.LIST,
    icon: <PeopleIcon />,
  },
  {
    title: 'Agenda',
    path: ROUTES.DASHBOARD.APPOINTMENTS.CALENDAR,
    icon: <CalendarMonthIcon />,
  },
  {
    title: 'Configurações',
    path: ROUTES.DASHBOARD.SETTINGS.ROOT,
    icon: <SettingsIcon />,
  },
];

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
  variant: 'permanent' | 'persistent' | 'temporary';
  width: number;
}

export function DashboardSidebar({ open, onClose, variant, width }: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();

  const isActiveRoute = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const drawer = (
    <>
      {/* Logo e nome da clínica */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 64,
          justifyContent: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            textAlign: 'center',
            color: 'text.primary',
            fontWeight: 600,
          }}
        >
          {user?.user_metadata?.clinic_name || 'Clínica Veterinária'}
        </Typography>
      </Box>

      {/* Menu de navegação */}
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (variant === 'temporary') {
                  onClose();
                }
              }}
              selected={isActiveRoute(item.path)}
              sx={{
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActiveRoute(item.path) ? 'inherit' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: width },
        flexShrink: { md: 0 },
      }}
    >
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Melhor desempenho em mobile
        }}
        sx={{
          display: { xs: 'block', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width,
            backgroundColor: 'background.paper',
            borderRight: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
} 