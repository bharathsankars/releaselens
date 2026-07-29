import { z } from "zod";

import { RELEASE_RISK_LEVELS } from "../constants/release-risk-level.js";

export const createReleaseSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Release name is required.")
      .max(150),

    version: z
      .string()
      .trim()
      .min(1, "Version is required."),

    description: z
      .string()
      .trim()
      .max(2000)
      .optional(),

    riskLevel: z.enum([
      RELEASE_RISK_LEVELS.LOW,
      RELEASE_RISK_LEVELS.MEDIUM,
      RELEASE_RISK_LEVELS.HIGH,
      RELEASE_RISK_LEVELS.CRITICAL,
    ]),

    plannedReleaseDate: z.coerce.date(),

    ownerId: z.string().min(1),

    services: z.array(z.string()).default([]),

    createdBy: z.string().min(1),

    updatedBy: z.string().min(1),
  }),
});

export type CreateReleaseRequest = z.infer<
  typeof createReleaseSchema
>["body"];