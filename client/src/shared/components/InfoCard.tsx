import { Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface InfoCardProps {
  label: string;
  value: ReactNode;
}

export const InfoCard = ({ label, value }: InfoCardProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 2,
      }}
    >
      <Stack spacing={1.5}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 600 }}
        >
          {label}
        </Typography>

        <Typography component="div" variant="h6" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
};