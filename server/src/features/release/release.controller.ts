import type { Request, Response } from "express";
import { Types } from "mongoose";

import { sendSuccess } from "../../shared/http/api-response.js";
import { releaseService } from "./release.service.js";
import type { CreateReleaseRequest } from "./schemas/create-release.schema.js";

export const createRelease = async (
  request: Request<unknown, unknown, CreateReleaseRequest>,
  response: Response,
): Promise<void> => {
  const { description, ...body } = request.body;

  const release = await releaseService.createRelease({
    ...body,
    ...(description !== undefined ? { description } : {}),
    ownerId: new Types.ObjectId(body.ownerId),
    createdBy: new Types.ObjectId(body.createdBy),
    updatedBy: new Types.ObjectId(body.updatedBy),
  });

  sendSuccess({
    response,
    statusCode: 201,
    data: release,
    requestId: request.requestId,
  });
};