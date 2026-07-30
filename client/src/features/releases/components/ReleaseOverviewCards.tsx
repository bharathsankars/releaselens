import { Chip, Stack, Typography } from "@mui/material";

import { InfoCard } from "../../../shared/components/InfoCard";

export const ReleaseOverviewCards = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Overview
      </Typography>

      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        <InfoCard
          label="Status"
          value={<Chip label="Draft" size="small" />}
        />

        <InfoCard
          label="Risk level"
          value={<Chip label="High" color="warning" size="small" />}
        />

        <InfoCard label="Planned release" value="15 August 2026, 22:00" />

        <InfoCard label="Owner" value="Bharath" />
      </Stack>
    </Stack>
  );
};