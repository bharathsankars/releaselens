import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCreateRelease } from "../features/releases/hooks/use-create-release";
import {
  createReleaseFormSchema,
  type CreateReleaseFormValues,
} from "../features/releases/schemas/create-release.schema";
import { ApiError } from "../shared/api/api-client";

export const CreateReleasePage = () => {
  const navigate = useNavigate();
  const createReleaseMutation = useCreateRelease();

  const {
    control,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<CreateReleaseFormValues>({
    resolver: zodResolver(createReleaseFormSchema),
    defaultValues: {
      name: "",
      version: "",
      description: "",
      riskLevel: "MEDIUM",
      plannedReleaseDate: "",
      services: "",
    },
  });

  const onSubmit = async (
    values: CreateReleaseFormValues,
  ): Promise<void> => {
    const services = values.services
      .split(",")
      .map((service) => service.trim())
      .filter(Boolean);

    try {
      await createReleaseMutation.mutateAsync({
        name: values.name,
        version: values.version,
        riskLevel: values.riskLevel,
        plannedReleaseDate: new Date(
          values.plannedReleaseDate,
        ).toISOString(),
        services,
        ...(values.description
          ? { description: values.description }
          : {}),
      });

      navigate("/releases");
    } catch (error) {
      if (
        error instanceof ApiError &&
        error.code === "RELEASE_ALREADY_EXISTS"
      ) {
        setError("version", {
          type: "server",
          message: error.message,
        });

        setFocus("version");
      }
    }
  };

  const mutationError = createReleaseMutation.error;

  const shouldShowPageError =
    mutationError !== null &&
    !(
      mutationError instanceof ApiError &&
      mutationError.code === "RELEASE_ALREADY_EXISTS"
    );

  return (
    <Stack spacing={3}>
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            navigate("/releases");
          }}
        >
          Back to Releases
        </Button>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mt: 2,
          }}
        >
          Create Release
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Define the release scope, planned date, risk and affected
          services.
        </Typography>
      </Box>

      {shouldShowPageError ? (
        <Alert severity="error">
          {mutationError instanceof ApiError
            ? mutationError.message
            : "Unable to create the release."}
        </Alert>
      ) : null}

      <Paper
        component="form"
        variant="outlined"
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
        sx={{
          p: {
            xs: 3,
            md: 4,
          },
          maxWidth: 800,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Release information
          </Typography>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Release name"
                placeholder="August Security Release"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="version"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Version"
                placeholder="2.5.0"
                error={Boolean(errors.version)}
                helperText={errors.version?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                placeholder="Describe the scope and purpose of this release."
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                multiline
                minRows={4}
                fullWidth
              />
            )}
          />

          <Controller
            name="riskLevel"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Risk level"
                error={Boolean(errors.riskLevel)}
                helperText={errors.riskLevel?.message}
                fullWidth
              >
                <MenuItem value="LOW">Low</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="CRITICAL">Critical</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="plannedReleaseDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Planned release date"
                type="datetime-local"
                error={Boolean(errors.plannedReleaseDate)}
                helperText={errors.plannedReleaseDate?.message}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                fullWidth
              />
            )}
          />

          <Controller
            name="services"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Affected services"
                placeholder="payments, authentication, notifications"
                error={Boolean(errors.services)}
                helperText={
                  errors.services?.message ??
                  "Enter multiple services separated by commas."
                }
                fullWidth
              />
            )}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              disabled={createReleaseMutation.isPending}
              onClick={() => {
                navigate("/releases");
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={createReleaseMutation.isPending}
            >
              {createReleaseMutation.isPending
                ? "Creating..."
                : "Create Release"}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};