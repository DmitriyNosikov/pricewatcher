import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { UserRolesType, UserRoleValues } from '../types/user-role.type';
import { UserStatusType, UserStatusValues } from '../types/user-status.type';

export class CreateUserDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsInt()
  telegramId: number;

  @IsIn(UserRoleValues)
  @IsString()
  @IsOptional()
  role?: UserRolesType;

  @IsIn(UserStatusValues)
  @IsString()
  @IsOptional()
  status?: UserStatusType;
}