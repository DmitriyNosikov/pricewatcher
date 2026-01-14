export const OrderDirectionEnum = {
  ASC: 'ASC',
  DESC: 'DESC'
} as const;

export type OrderDirectionType = (typeof OrderDirectionEnum)[keyof typeof OrderDirectionEnum];