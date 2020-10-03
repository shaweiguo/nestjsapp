import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CommunityDocument = Community & Document;

@Schema()
export class Community {
  // @Prop({ required: true})
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  capacity: number;

  @Prop()
  description: string;

  @Prop()
  address: string;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
