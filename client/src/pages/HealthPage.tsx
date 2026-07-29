import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { useHealth } from "../features/health/hooks/use-health";

export const HealthPage = () => {
  const { data, isLoading, isFetching, error, refetch } = useHealth();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            System Health
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Monitor the availability of the ReleaseLens platform.
          </Typography>
        </Box>

        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                void refetch();
              }}
            >
              Retry
            </Button>
          }
        >
          Unable to connect to the ReleaseLens API.
        </Alert>
      </Stack>
    );
  }

  const checkedAt = new Date(data.data.timestamp).toLocaleString();

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            System Health
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Monitor the availability of the ReleaseLens platform.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          disabled={isFetching}
          onClick={() => {
            void refetch();
          }}
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </Button>
      </Box>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <HealthAndSafetyOutlinedIcon
                color="success"
                sx={{ fontSize: 48 }}
              />

              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  All systems operational
                </Typography>

                <Typography color="text.secondary">
                  The Release Lens API is responding normally.
                </Typography>
              </Box>

              <Chip
                label={data.data.status.toUpperCase()}
                color="success"
                sx={{ ml: "auto", fontWeight: 700 }}
              />
            </Box>

            <Divider />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 3,
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Service
                </Typography>

                <Typography sx={{ fontWeight: 600, mt: 0.5 }}>
                  {data.data.service}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Environment
                </Typography>

                <Typography sx={{ fontWeight: 600, mt: 0.5 }}>
                  {data.data.environment}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Last checked
                </Typography>

                <Typography sx={{ fontWeight: 600, mt: 0.5 }}>
                  {checkedAt}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Request ID
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                    mt: 0.5,
                    wordBreak: "break-all",
                  }}
                >
                  {data.meta.requestId}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
