import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { OnEvent } from '@nestjs/event-emitter';

import { User } from '@core/db/models/user';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { UserReposiroty } from './user.repository';

import { WithPaginationType, OrderDirectionEnum, EventTypeEnum } from '@core/types';
import { UserHandleTelegramBotStartPayloadType } from './types/user-handlers.type';
import { CreateUserDTO } from './dto/create-user.dto';
import { IndexUserDTO } from './dto/index-user.dto';

import { UserLimits } from './user.constant';


const { LIMIT, OFFSET } = UserLimits;

@Injectable()
export class UserService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
    private readonly userRepository: UserReposiroty
  ) { }
  /*
    TODO:
    Пока Telegram является основной платформой
    для взаимодействия с сервисом - регаем юзеров
    по TelegramId, соответственно, уникальность
    пользователей отслеживаем также по нему
  */
  public async createUser(data: CreateUserDTO): Promise<User> {
    this.logger.info(`Регистрация нового пользователя с данными: ${data}`);

    if (!data.telegramId) {
      const errorMessage = `Ошибка при создании пользователя. Не передан параметр telegramId: ${data.telegramId}`;

      this.logger.error(errorMessage);

      throw new BadRequestException(errorMessage);
    }

    const isUserExists = await this.userRepository.findByTelegramId(data.telegramId);

    if (isUserExists) {
      const errorMessage = `Пользователь с telegramId ${data.telegramId} уже заренистрирован в системе`;

      this.logger.error(errorMessage);

      throw new ConflictException(errorMessage);
    }

    try {
      const user = await this.userRepository.createUser(data);

      this.logger.info(`Пользоватеь ${user.id} успешно зарегистрирован`);

      return user;
    } catch (error) {
      const errorMessage = `Не удалось зарегистрировать пользователя. Ошибка: ${error}`;

      this.logger.error(errorMessage);

      throw new BadRequestException(errorMessage);
    }
  }

  public async index(options: IndexUserDTO): Promise<WithPaginationType<User>> {
    const orderBy = options.orderBy ? options.orderBy : 'id';
    const orderDirection = options.orderDirection ? options.orderDirection : OrderDirectionEnum.DESC;

    const indexOptions = {
      limit: options.limit ?? LIMIT.MAX,
      offset: options.offset ?? OFFSET.MAX,
      order: [
        [orderBy, orderDirection]
      ]

    }

    this.logger.info(`Получение списка пользователей. Опции поиска: ${indexOptions}`);

    const users = await this.userRepository.index(options);
    const allUsersCount = await this.userRepository.countUsers();

    this.logger.info(`Найдено пользователей: ${users?.length}`);

    const page = Math.floor(indexOptions.offset / indexOptions.limit);
    const totalPages = Math.floor(allUsersCount / indexOptions.limit);

    const response: WithPaginationType<User> = {
      data: users,
      limit: indexOptions.limit ?? LIMIT.MAX,
      page,
      totalPages,
      totalItems: allUsersCount
    }

    this.logger.info(`Найдено пользователей (ответ сервера): ${response}`);

    return response;
  }

  public async deleteUser(userId: number): Promise<void> {
    this.logger.info(`Удаление (soft) пользователя с id ${userId}`);

    await this.userRepository.softDelete(userId);

    this.logger.info(`Пользователь с id ${userId} успешно удален (soft)`);
  }

  @OnEvent(EventTypeEnum.TELEGRAM_START, { async: true })
  private async handleTelegramBotStart(
    payload: UserHandleTelegramBotStartPayloadType
  ): Promise<void> {
    console.log(payload);

    this.logger.info(`Модулем 'User' перехвачено событие ${EventTypeEnum.TELEGRAM_START}. Payload: ${JSON.stringify(payload)}`);
  }
}