import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { ReleasesTable } from "../features/releases/components/ReleasesTable";
import { useReleases } from "../features/releases/hooks/use-releases";
import { useNavigate } from "react-router-dom";

export const ReleasesPage = () => {
  const { data, isLoading, error, refetch } = useReleases();
  const navigate = useNavigate();

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
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Releases
        </Typography>

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
          Unable to load releases.
        </Alert>
      </Stack>
    );
  }

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
            Releases
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Track planned releases, risk, status, and affected services.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            navigate("/releases/new");
          }}
        >
          New Release
        </Button>
      </Box>

      {data.data.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            p: 6,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            No releases yet
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Create the first release to start tracking release readiness.
          </Typography>
        </Paper>
      ) : (
        <ReleasesTable releases={data.data} />
      )}
    </Stack>
  );
};
