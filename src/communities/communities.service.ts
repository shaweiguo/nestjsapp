import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Community, CommunityDocument } from "./communities.schema";
import { CreateCommunityDto } from "./communities.dto";

@Injectable()
export class CommunitiesService {
  constructor(@InjectModel(Community.name) private communityModel: Model<CommunityDocument>) {}

  async create(createCommunityDto: CreateCommunityDto): Promise<Community> {
    const comm = new this.communityModel(createCommunityDto);
    return comm.save();
  }

  async getAll(): Promise<Community[]> {
    return this.communityModel.find().exec();
  }
}
