import { Module } from '@nestjs/common';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BobSubscription } from '../bob-subscription/bob-subsription.entity';
import { AliceSubscription } from '../alice-subscription/alice-subscription.entity';
import { TaskService } from '../task/task.service';
import { Transaction } from '../transaction/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BobSubscription, AliceSubscription, Transaction]),
  ],
  controllers: [BaseController],
  providers: [BaseService, TaskService],
})
export class BaseModule {}
