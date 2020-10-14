import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Commuser, CommuserDocument } from "./commuser.schema";
import { CreateCommuserDto } from "./commuser.dto";

@Injectable()
export class CommuserService {
  constructor(
    @InjectModel(Commuser.name) private model: Model<CommuserDocument>
  ) { }

  async create(dto: CreateCommuserDto): Promise<Commuser> {
    const cu = new this.model(dto);
    return cu.save();
  }

  async getOne(comm_id, user_id: string): Promise<Commuser | undefined> {
    const obj = await this.model.findOne({ comm_id, user_id }).exec();
    return obj;
  }

  async getId(comm_id, user_id: string): Promise<String | undefined> {
    const obj = await this.model.findOne({ comm_id, user_id }).exec();
    return obj._id;
  }

  async getCommsByUserId(user_id: string): Promise<Commuser[]> {
    return await this.model.find({ user_id }).exec();
  }

  async getUsersByCommId(comm_id: string): Promise<Commuser[]> {
    return await this.model.find({ comm_id }).exec();
  }

  async update(_id: string, dto: CreateCommuserDto): Promise<Commuser | undefined> {
    return await this.model.findByIdAndUpdate(_id, dto, { new: true });
  }

  async delete(comm_id, user_id: string): Promise<Commuser | undefined> {
    console.log(comm_id, user_id);
    return await this.model.findOneAndDelete({ comm_id, user_id });
  }
}
