import {
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface ActivityItemProps {
  label: string;
  value: string;
}

const ActivityItem = ({ label, value }: ActivityItemProps) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>

      <Typography sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Stack>
  );
};

export const ReleaseActivityCard = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Activity
        </Typography>

        <Divider />

        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          <ActivityItem
            label="Created"
            value="29 July 2026, 18:30"
          />

          <ActivityItem
            label="Last updated"
            value="30 July 2026, 09:15"
          />

          <ActivityItem
            label="Created by"
            value="Bharath"
          />

          <ActivityItem
            label="Updated by"
            value="Bharath"
          />
        </Stack>
      </Stack>
    </Paper>
  );
};