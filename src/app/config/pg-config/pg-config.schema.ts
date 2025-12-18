import { Logger } from '@nestjs/common';
import { IsString, validateOrReject, ValidationError } from 'class-validator';

import { ConfigMessages } from '../config.constant';

export const PGConfigEnum = {
  POSTGRES_URL: 'postgresURL',
  POSTGRES_USER: 'postgresUser',
  POSTGRES_PASSWORD: 'postgresPassword',
  POSTGRES_DB_NAME: 'postgresDatabaseName',
  POSTGRES_PORT: 'postgresPort',
} as const;


export interface PGConfigInterface {
  [PGConfigEnum.POSTGRES_URL]: string;
  [PGConfigEnum.POSTGRES_USER]: string;
  [PGConfigEnum.POSTGRES_PASSWORD]: string;
  [PGConfigEnum.POSTGRES_DB_NAME]: string;
  [PGConfigEnum.POSTGRES_PORT]: number;
}

export class PGConfigSchema implements PGConfigInterface {
  private readonly loggerPrefix = '[PG Config] ---> ';
  private readonly logger: Logger = new Logger(PGConfigSchema.name);

  @IsString()
  postgresURL: string;

  @IsString()
  postgresUser: string;

  @IsString()
  postgresPassword: string;

  @IsString()
  postgresDatabaseName: string;

  @IsString()
  postgresPort: number;

  async validate() {
    return await validateOrReject(this).catch((errors) => {
      this.logger.log(`${this.loggerPrefix} ${ConfigMessages.ERROR.VALIDATION}:`, errors);

      throw new ValidationError();
    });
  }
}
