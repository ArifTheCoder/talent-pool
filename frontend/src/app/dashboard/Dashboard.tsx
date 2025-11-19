import { FunctionComponent } from 'react';
import { useProfiles } from '../../hooks';
import { Alert, Box, Card, CardContent, Grid, Typography } from '@mui/material';

const Dashboard: FunctionComponent = () => {
  const [profiles, error] = useProfiles();

  return (
    <Box sx={{ p: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}

      {profiles.length ? (
        <Grid container spacing={2}>
          {profiles.map((profile) => (
            <Grid item key={profile.pk} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{profile.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No profiles found</Typography>
      )}
    </Box>
  );
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;
