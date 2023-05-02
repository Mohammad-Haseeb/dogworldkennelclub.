import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  sureName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  telephone: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  town: string;
  @IsNotEmpty()
  streetAddress: string;
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  postcode: string;
  @IsNotEmpty()
  password: string;
}
