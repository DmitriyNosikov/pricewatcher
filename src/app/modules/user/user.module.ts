import { User } from '@core/db/models';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserService } from './user.service';
import { UserReposiroty } from './user.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([User])
  ],
  controllers: [],
  providers: [UserService, UserReposiroty],
  exports: [UserService]
})
export class UserModule { }