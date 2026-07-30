import { Types } from "mongoose";
import { z } from "zod";

export const releaseIdSchema = z.object({
  params: z.object({
    releaseId: z
      .string()
      .refine(
        (value) => Types.ObjectId.isValid(value),
        "Release ID must be a valid MongoDB ObjectId.",
      ),
  }),
});