import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type {
  Release,
  ReleaseRiskLevel,
  ReleaseStatus,
} from "../types/release.types";

interface ReleasesTableProps {
  releases: Release[];
}

const formatLabel = (value: string): string =>
  value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getStatusColour = (
  status: ReleaseStatus,
): "default" | "primary" | "success" | "warning" | "error" => {
  switch (status) {
    case "APPROVED":
    case "DEPLOYED":
      return "success";

    case "SCHEDULED":
    case "DEPLOYING":
      return "primary";

    case "FAILED":
    case "ROLLED_BACK":
      return "error";

    case "READY_FOR_APPROVAL":
      return "warning";

    default:
      return "default";
  }
};

const getRiskColour = (
  riskLevel: ReleaseRiskLevel,
): "default" | "success" | "warning" | "error" => {
  switch (riskLevel) {
    case "LOW":
      return "success";

    case "MEDIUM":
      return "default";

    case "HIGH":
      return "warning";

    case "CRITICAL":
      return "error";
  }
};

export const ReleasesTable = ({ releases }: ReleasesTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Risk</TableCell>
            <TableCell>Planned release</TableCell>
            <TableCell>Services</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {releases.map((release) => (
            <TableRow key={release._id} hover>
              <TableCell>
                <Typography sx={{ fontWeight: 600 }}>
                  {release.name}
                </Typography>
              </TableCell>

              <TableCell>{release.version}</TableCell>

              <TableCell>
                <Chip
                  label={formatLabel(release.status)}
                  color={getStatusColour(release.status)}
                  size="small"
                />
              </TableCell>

              <TableCell>
                <Chip
                  label={formatLabel(release.riskLevel)}
                  color={getRiskColour(release.riskLevel)}
                  size="small"
                />
              </TableCell>

              <TableCell>
                {new Date(release.plannedReleaseDate).toLocaleString()}
              </TableCell>

              <TableCell>
                {release.services.length > 0
                  ? release.services.join(", ")
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};