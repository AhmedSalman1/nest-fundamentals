import { IsEmail, IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20, { groups: ['create'] })
  readonly username: string;

  @IsInt()
  @Min(12)
  @Max(120)
  readonly age?: number;

  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @IsString()
  readonly country: string;

  @IsString()
  readonly password: string;
}
