import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum, UserRolesType, UserRoleValues } from '../types/user-role.type';
import { UserStatusEnum, UserStatusType, UserStatusValues } from '../types/user-status.type';

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

  @IsString()
  @IsIn(UserRoleValues)
  @IsOptional()
  role?: UserRolesType = UserRoleEnum.USER;

  @IsString()
  @IsIn(UserStatusValues)
  @IsOptional()
  status?: UserStatusType = UserStatusEnum.DISABLED;

  @IsInt()
  telegramId: string;
}