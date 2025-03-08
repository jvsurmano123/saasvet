import { Box, Container, Grid, Paper, Typography } from '@mui/material';

export function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Boas-vindas */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Bem-vindo(a) ao SaasVet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gerencie sua clínica veterinária de forma simples e eficiente
            </Typography>
          </Paper>
        </Grid>

        {/* Cards de estatísticas */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6" gutterBottom>
              Consultas Hoje
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              0
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6" gutterBottom>
              Pacientes Ativos
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              0
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6" gutterBottom>
              Consultas Pendentes
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              0
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography variant="h6" gutterBottom>
              Veterinários
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              0
            </Typography>
          </Paper>
        </Grid>

        {/* Próximas consultas */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Próximas Consultas
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" color="text.secondary" align="center">
                Nenhuma consulta agendada para hoje
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
} 