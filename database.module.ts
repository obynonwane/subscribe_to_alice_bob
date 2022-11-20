import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BobSubscription } from './src/bob-subscription/bob-subsription.entity';
import { AliceSubscription } from './src/alice-subscription/alice-subscription.entity';
import { Transaction } from './src/transaction/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [BobSubscription, AliceSubscription, Transaction],
        seeds: ['src/seeds/**/*{.ts,.js}'],
        autoLoadEntities: true,
      }),
    }),
  ],
})
class DatabaseModule {}

export default DatabaseModule;
