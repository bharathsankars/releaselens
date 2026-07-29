import type { QueryFilter, Types } from "mongoose";

import { ReleaseModel } from "./release.model.js";
import type { Release } from "./release.types.js";

export type CreateReleaseData = Omit<
  Release,
  "_id" | "createdAt" | "updatedAt"
>;

export const releaseRepository = {
  async create(data: CreateReleaseData): Promise<Release> {
    const release = await ReleaseModel.create(data);

    return release.toObject();
  },

  async findById(id: Types.ObjectId): Promise<Release | null> {
    return ReleaseModel.findById(id).lean().exec();
  },

  async findOne(filter: QueryFilter<Release>): Promise<Release | null> {
    return ReleaseModel.findOne(filter).lean().exec();
  },

  async findAll(filter: QueryFilter<Release> = {}): Promise<Release[]> {
    return ReleaseModel.find(filter)
      .sort({ plannedReleaseDate: 1 })
      .lean()
      .exec();
  },
};