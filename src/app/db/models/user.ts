import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export const UserRoleEnum = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
} as const;

export type UserRolesType = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

export const UserStatusEnum = {
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED',
  BANNED: 'BANNED',
  DELETED: 'DELETED'
} as const;

export type UserStatusType = (typeof UserStatusEnum)[keyof typeof UserStatusEnum];

export interface UserInterface extends Model<
  InferAttributes<UserInterface>,
  InferCreationAttributes<UserInterface>
> {
  id: number;
  name: string;
  email: string | null;
  phone: number | null;
  telegramId: number | null;
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

  @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
  crmUserId: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  email: string | null;

  @Column({ type: DataType.TEXT, allowNull: true })
  phone: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  telegramId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  role: UserRolesType;

  @Column({ type: DataType.ENUM, allowNull: false, defaultValue: 'ACTIVE' })
  status: UserStatusType;
}


