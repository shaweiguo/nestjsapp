import { IsNotEmpty, MinLength, IsEmail, IsInt, MaxLength, IsString, EQUALS, ValidationArguments } from 'class-validator';

export class CreateCommunityDto {
  @MinLength(4, {
    message: (args: ValidationArguments) => {
        if (args.value.length === 1) {
            return "Too short, minimum length is 1 character";
        } else {
            return "Too short, minimum length is " + args.constraints[0] + " characters";
        }
    }
  })
  @MaxLength(20)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  capacity: number;

  @IsString()
  description: string;

  @IsString()
  address: string;
}
