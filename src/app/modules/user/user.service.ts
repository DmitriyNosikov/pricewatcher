import { Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { Logger } from 'winston';

import { User, UserInterface } from '@core/db/models/user';

import { UserReposiroty } from './user.repository';
import { IndexUserDTO } from './dto/index-user.dto';
import { WithPaginationType } from '@core/types/with-pagination.type.';
import { UserLimits } from './user.constant';
import { OrderDirectionEnum } from '@core/types/search.type';

const { LIMIT, OFFSET } = UserLimits;

@Injectable()
export class UserService {
  constructor(
    private readonly logger: Logger = new Logger(),
    private readonly userRepository: UserReposiroty
  ) { }

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
}