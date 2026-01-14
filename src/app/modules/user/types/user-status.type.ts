
export const UserStatusEnum = {
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED',
  BANNED: 'BANNED',
  DELETED: 'DELETED'
} as const;

export type UserStatusType = (typeof UserStatusEnum)[keyof typeof UserStatusEnum];

export const UserStatusValues: UserStatusType[] = Object.values(UserStatusEnum);