export const UserRoleEnum = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
} as const;

export type UserRolesType = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

export const UserRoleValues: UserRolesType[] = Object.values(UserRoleEnum);