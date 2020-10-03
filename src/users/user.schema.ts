// import { Schema } from "mongoose";

// export const UserSchema = new Schema({
//   name: String,
//   firstName: String,
//   lastName: String,
//   password: String,
//   email: String,
//   age: Number,
// });
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  name: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  password: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const UserSchema = SchemaFactory.createForClass(User);