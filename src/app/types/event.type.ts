export const EventNamespacesEnum = {
  TELEGRAM: 'telegram'
} as const;

export const EventTypeEnum = {
  TELEGRAM_START: `${EventNamespacesEnum.TELEGRAM}.start`,
} as const;