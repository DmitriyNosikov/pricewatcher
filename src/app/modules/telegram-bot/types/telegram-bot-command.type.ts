import { UserRolesType } from '@core/db/models';

export const TelegramBotComamndNameEnum = {
  START: 'start',
  HELP: 'help',
  STATUS: 'status',
} as const;

export type TelegramBotCommandType = {
  description: string;
  roles: UserRolesType[];
}

export type TelegramBotCommandName = (typeof TelegramBotComamndNameEnum)[keyof typeof TelegramBotComamndNameEnum];

export type TelegramBotCommandsConfig = Record<TelegramBotCommandName, TelegramBotCommandType>;