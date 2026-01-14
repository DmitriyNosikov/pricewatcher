import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order, WhereOptions } from 'sequelize';
import { User } from '@core/db/models';
import { UserInterface } from '@core/db/models/user';

// TODO:
// Выенсти в отдельные типы
// Избавиться от "магических" значений
type IndexOptionsType = {
  where?: WhereOptions<UserInterface>,
  limit?: number,
  offset?: number,
  order?: Order,
}

const defaultIndexOptions: IndexOptionsType = {
  limit: 100,
  offset: 0,
  order: [
    ['id', 'DESC']
  ]
};

@Injectable()
export class UserReposiroty {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) { }

  private async index(
    options: IndexOptionsType = defaultIndexOptions
  ): Promise<User[] | null> {
    const users = await this.userModel.findAll(options);

    return users;
  }

  private async findById(userId: number): Promise<User | null> {
    const user = await this.userModel.findByPk(userId);

    return user;
  }

  private async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { email }
    });

    return user;
  }

  private async findByPhone(phone: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { phone }
    });

    return user;
  }

  private async findByTelegramId(telegramId: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { telegramId }
    });

    return user;
  }

  private async softDelete(userId: number): Promise<void> {
    await this.userModel.destroy({
      where: { id: userId }
    })
  }

  private async hardDelete(userId: number): Promise<void> {
    await this.userModel.destroy({
      where: { id: userId },
      force: true
    });
  }
}