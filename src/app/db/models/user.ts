import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

import { UserRoleEnum, UserRolesType } from '@core/modules/user/types/user-role.type';
import { UserStatusEnum, UserStatusType } from '@core/modules/user/types/user-status.type';

export interface UserInterface extends Model<
  InferAttributes<UserInterface>,
  InferCreationAttributes<UserInterface>
> {
  id: number;
  name: string;
  email: string;
  phone: string;
  telegramId: number;
  role: UserRolesType;
  status: UserStatusType;
}

@Table({
  paranoid: true
})
export class User extends Model<UserInterface> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: CreationOptional<number>;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING, unique: true })
  phone: string;

  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  telegramId: number;

  @Column({ type: DataType.STRING, defaultValue: UserRoleEnum.USER })
  role: UserRolesType;

  @Column({ type: DataType.STRING, defaultValue: UserStatusEnum.DISABLED })
  status: UserStatusType;
}


