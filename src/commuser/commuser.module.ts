import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { CommuserController } from "./commuser.controller";
import { CommuserService } from "./commuser.service";
import { Commuser, CommuserSchema } from "./commuser.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Commuser.name, schema: CommuserSchema}
    ])
  ],
  controllers: [CommuserController],
  providers: [CommuserService],
})
export class CommuserModule {}
