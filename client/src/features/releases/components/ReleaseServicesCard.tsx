import { Chip, Paper, Stack, Typography } from "@mui/material";

const services = [
  "Authentication",
  "Payments",
  "Notifications",
];

export const ReleaseServicesCard = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
      }}
    >
      <Stack spacing={2}>
        <BoxTitle />

        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {services.map((service) => (
            <Chip
              key={service}
              label={service}
              color="success"
              variant="outlined"
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

const BoxTitle = () => {
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Affected services
      </Typography>

      <Typography color="text.secondary">
        Services included in this release scope.
      </Typography>
    </>
  );
};