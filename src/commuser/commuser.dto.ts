import { IsNotEmpty } from "class-validator";

export class CreateCommuserDto {
  @IsNotEmpty()
  comm_id: string;

  @IsNotEmpty()
  user_id: string;
}
