import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '@core/db/models';
import { IndexUserDTO } from './dto/index-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserReposiroty {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) { }
  public async createUser(data: CreateUserDTO): Promise<User> {
    const user = await this.userModel.create(data);

    return user;
  }

  public async countUsers(): Promise<number> {
    const usersCount = await this.userModel.count();

    return usersCount;
  }

  public async index(
    options: IndexUserDTO
  ): Promise<User[] | null> {
    const users = await this.userModel.findAll(options);

    return users;
  }

  public async findById(userId: number): Promise<User | null> {
    const user = await this.userModel.findByPk(userId);

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { email }
    });

    return user;
  }

  public async findByPhone(phone: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { phone }
    });

    return user;
  }

  public async findByTelegramId(telegramId: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { telegramId }
    });

    return user;
  }

  public async softDelete(userId: number): Promise<void> {
    await this.userModel.destroy({
      where: { id: userId }
    })
  }

  public async hardDelete(userId: number): Promise<void> {
    await this.userModel.destroy({
      where: { id: userId },
      force: true
    });
  }
}