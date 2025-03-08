import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import styled from 'styled-components';

const PublicLayoutRoot = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const PublicLayoutContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3)};
`;

export function PublicLayout() {
  return (
    <PublicLayoutRoot>
      <PublicLayoutContainer maxWidth="sm">
        <Outlet />
      </PublicLayoutContainer>
    </PublicLayoutRoot>
  );
} 