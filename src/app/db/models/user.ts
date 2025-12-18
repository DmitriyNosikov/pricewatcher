import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export const UserRoleEnum = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
} as const;

export type UserRolesType = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

export const USER_ROLE_VALUES: UserRolesType[] = [
  UserRoleEnum.ADMIN,
  UserRoleEnum.MANAGER,
  UserRoleEnum.USER,
];

export interface UserInterface extends Model<
  InferAttributes<UserInterface>,
  InferCreationAttributes<UserInterface>
> {
  id: number;
  name: string;
  email: string | null;
  telegramId: number | null;
  role: UserRolesType;
  isActive: boolean;
}

@Table({})
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

  @Column({ type: DataType.TEXT, allowNull: true, field: 'amojo_id' })
  amojoId: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  telegramId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  role: UserRolesType;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isActive: boolean;
}


