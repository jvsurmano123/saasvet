import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode, useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';
import MenuIcon from '@mui/icons-material/Menu';

const DRAWER_WIDTH = 280;
const MOBILE_DRAWER_WIDTH = 240;

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <DashboardSidebar
        open={isMobile ? mobileOpen : isOpen}
        onClose={handleDrawerToggle}
        variant={isMobile ? 'temporary' : 'permanent'}
        width={isMobile ? MOBILE_DRAWER_WIDTH : DRAWER_WIDTH}
      />

      {/* Área principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          pt: '64px', // Altura do header
          bgcolor: 'background.default',
        }}
      >
        {/* Header */}
        <DashboardHeader
          open={isOpen}
          onDrawerToggle={handleDrawerToggle}
          drawerWidth={isMobile ? 0 : DRAWER_WIDTH}
        >
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </DashboardHeader>

        {/* Conteúdo */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: 3,
            bgcolor: 'background.default',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
} 