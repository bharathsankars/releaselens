import { Paper, Stack, Typography } from "@mui/material";

export const ReleaseDescriptionCard = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Description
        </Typography>

        <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
          This release contains security patches, payment validation
          improvements and dependency upgrades. It also includes changes to
          authentication token handling and production monitoring.
        </Typography>
      </Stack>
    </Paper>
  );
};