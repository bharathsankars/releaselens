import type { Request, Response } from "express";
import { Types } from "mongoose";

import { sendSuccess } from "../../shared/http/api-response.js";
import { releaseService } from "./release.service.js";
import type { CreateReleaseRequest } from "./schemas/create-release.schema.js";

interface ReleaseParams {
  releaseId: string;
}

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

export const getReleases = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const releases = await releaseService.getReleases();

  response.status(200).json({
    data: releases,
    meta: {
      count: releases.length,
      requestId: request.requestId,
    },
  });
};

export const getReleaseById = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { releaseId } = request.params as {
    releaseId: string;
  };

  const release = await releaseService.getReleaseById(
    new Types.ObjectId(releaseId),
  );

  sendSuccess({
    response,
    statusCode: 200,
    data: release,
    requestId: request.requestId,
  });
};