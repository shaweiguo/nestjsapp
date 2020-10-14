import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// export const Commuser = new Schema({
//   comm_id: String,
//   user_id: String,
// })

// export interface CommuserDocument extends Document {
//   readonly comm_id: string,
//   readonly user_id: string,
// }

export type CommuserDocument = Commuser & Document;

@Schema()
export class Commuser {
  // @Prop()
  // name: string;

  @Prop({ required: true })
  comm_id: string;

  @Prop({ required: true })
  user_id: string;
}

export const CommuserSchema = SchemaFactory.createForClass(Commuser);
