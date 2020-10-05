import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { User } from './user.interface';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './user.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSaltSync(8);
    const hash = await bcrypt.hashSync(createUserDto.password, salt);
    createUserDto.password = hash;
    const createdUser = new this.model(createUserDto);
    return createdUser.save();
  }

  async getAll(): Promise<User[]> {
    return this.model.find().exec();
  }


  async getAUser(userId): Promise<User> {
    const user = await this.model.findById(userId).exec();
    return user;
  }

  async updateAUser(_id, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.model.findByIdAndUpdate(_id, createUserDto, { new: true });
    return user;
  }

  async deleteAUser(_id): Promise<any> {
    const user = await this.model.findByIdAndRemove(_id);
    return user;
  }
}
