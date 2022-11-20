import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { BobSubscription } from './src/bob-subscription/bob-subsription.entity';
import { AliceSubscription } from './src/alice-subscription/alice-subscription.entity';
import { InitialMigration1668774247266 } from './migrations/1668774247266-InitialMigration';
import { Transaction } from './src/transaction/transaction.entity';
import { TransactionMigration1668914528075 } from './migrations/1668914528075-TransactionMigration';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [BobSubscription, AliceSubscription, Transaction],
  migrations: [
    InitialMigration1668774247266,
    TransactionMigration1668914528075,
  ],
});
