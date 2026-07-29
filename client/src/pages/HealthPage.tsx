import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useHealth } from "../features/health/hooks/use-health";

export const HealthPage = () => {
  const { data, isLoading, error } = useHealth();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 6,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">Failed to connect to the ReleaseLens API.</Alert>
    );
  }

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        System Health
      </Typography>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6">Status: {data?.data.status}</Typography>

          <Typography>Service: {data?.data.service}</Typography>

          <Typography>Environment: {data?.data.environment}</Typography>

          <Typography>Timestamp: {data?.data.timestamp}</Typography>

          <Typography color="text.secondary">
            Request ID: {data?.meta.requestId}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
