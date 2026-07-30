import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ReleaseHeader = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={2}>
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            navigate("/releases");
          }}
        >
          Back to Releases
        </Button>
      </Box>

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
            August Security Release
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Version 2.5.0
          </Typography>
        </Box>

        <Chip
          label="Draft"
          variant="outlined"
          sx={{
            fontWeight: 700,
            px: 1,
          }}
        />
      </Box>

      <Typography color="text.secondary">
        Security improvements, dependency upgrades and payment service fixes
        planned for the August production release.
      </Typography>
    </Stack>
  );
};