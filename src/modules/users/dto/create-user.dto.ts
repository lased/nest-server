import { IsEnum, IsOptional, IsString } from 'class-validator';

import Permission from 'src/permission';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(Permission, { each: true })
  permissions: Permission[];
}
