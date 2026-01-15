import { User } from '@core/db/models';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([User])
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class UserModule { }