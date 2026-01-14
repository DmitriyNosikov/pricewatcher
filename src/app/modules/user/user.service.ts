import { Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { UserReposiroty } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: Logger = new Logger(),
    private readonly userRepository: UserReposiroty
  ) { }
}