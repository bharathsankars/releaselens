import { Stack } from "@mui/material";

import { ReleaseActivityCard } from "../features/releases/components/ReleaseActivityCard";
import { ReleaseDescriptionCard } from "../features/releases/components/ReleaseDescriptionCard";
import { ReleaseHeader } from "../features/releases/components/ReleaseHeader";
import { ReleaseOverviewCards } from "../features/releases/components/ReleaseOverviewCards";
import { ReleaseServicesCard } from "../features/releases/components/ReleaseServicesCard";

export const ReleaseDetailsPage = () => {
  return (
    <Stack spacing={4}>
      <ReleaseHeader />

      <ReleaseOverviewCards />

      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "minmax(0, 2fr) minmax(280px, 1fr)",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        <ReleaseDescriptionCard />

        <ReleaseServicesCard />
      </Stack>

      <ReleaseActivityCard />
    </Stack>
  );
};