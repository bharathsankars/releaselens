import mongoose from "mongoose";

import { env } from "./env.js";
import { logger } from "./logger.js";

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(env.MONGODB_URI);

  logger.info("Connected to MongoDB");
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();

  logger.info("Disconnected from MongoDB");
};