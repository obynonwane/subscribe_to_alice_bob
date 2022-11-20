import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleModule } from '@nestjs/schedule';
import { BaseModule } from './base/base.module';
import { AliceSubscriptionModule } from './alice-subscription/alice-subscription.module';
import { BobSubscriptionService } from './bob-subscription/bob-subscription.service';
import { BobSubscriptionModule } from './bob-subscription/bob-subscription.module';
import { AliceSubscription } from './alice-subscription/alice-subscription.entity';
import { BobSubscription } from './bob-subscription/bob-subsription.entity';
import { TaskModule } from './task/task.module';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/transaction.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DATABASE_HOST'),
          port: config.get<number>('DATABASE_PORT'),
          username: config.get<string>('DATABASE_USER'),
          password: config.get<string>('DATABASE_PASSWORD'),
          database: config.get<string>('DATABASE_NAME'),
          synchronize: false,
          entities: [BobSubscription, AliceSubscription, Transaction],
        };
      },
    }),
    BaseModule,
    AliceSubscriptionModule,
    BobSubscriptionModule,
    TaskModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService, BobSubscriptionService],
})
export class AppModule {}
