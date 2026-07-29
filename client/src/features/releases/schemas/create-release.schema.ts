import { z } from "zod";

export const createReleaseFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Release name is required.")
    .max(150, "Release name must not exceed 150 characters."),

  version: z
    .string()
    .trim()
    .min(1, "Version is required."),

  description: z
    .string()
    .trim()
    .max(2000, "Description must not exceed 2,000 characters.")
    .optional(),

  riskLevel: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),

  plannedReleaseDate: z
    .string()
    .min(1, "Planned release date is required."),

  services: z.string(),
});

export type CreateReleaseFormValues = z.infer<
  typeof createReleaseFormSchema
>;