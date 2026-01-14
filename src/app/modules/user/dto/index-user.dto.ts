import { IsInt, IsObject, IsOptional, IsString, Max, Min } from 'class-validator';
import { WhereOptions } from 'sequelize';
import { UserLimits } from '../user.constant';
import { UserInterface } from '@core/db/models/user';
import { OrderDirectionEnum, OrderDirectionType } from '@core/types/search.type';

const { LIMIT, OFFSET } = UserLimits;

export class IndexUserDTO {
  @IsObject()
  @IsOptional()
  public where?: WhereOptions<UserInterface>,

  @Max(LIMIT.MAX)
  @Min(LIMIT.MIN)
  @IsInt()
  @IsOptional()
  public limit?: number = LIMIT.MAX;

  @Max(OFFSET.MAX)
  @Min(OFFSET.MIN)
  @IsInt()
  @IsOptional()
  public offset?: number = OFFSET.MAX

  @IsString()
  @IsOptional()
  public orderBy?: string

  @IsString()
  @IsOptional()
  public orderDirection: OrderDirectionType = OrderDirectionEnum.DESC
}