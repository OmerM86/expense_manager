import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from 'src/category/entity/category.entity';
import { Expense } from 'src/expense/entity/expense.entity';
import { Users } from 'src/users/entity/users.entity';
import 'dotenv/config';

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`ConfigError: missing env variable.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('PG_HOST'),
      port: parseInt(this.getValue('PG_PORT')),
      username: this.getValue('PG_USER'),
      password: this.getValue('PG_PASSWORD'),
      database: this.getValue('PG_DB'),
      synchronize: true,
      entities: [Users, Expense, Category],
    };
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getJwtSecret() {
    return this.getValue('JWT_SECRET', true);
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'PG_HOST',
  'PG_PORT',
  'PG_USER',
  'PG_PASSWORD',
  'PG_DB',
]);

export { configService };
