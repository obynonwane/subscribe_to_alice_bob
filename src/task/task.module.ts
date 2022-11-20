import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BobSubscription } from '../bob-subscription/bob-subsription.entity';
import { AliceSubscription } from '../alice-subscription/alice-subscription.entity';
import { Transaction } from '../transaction/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BobSubscription, AliceSubscription, Transaction]),
  ],
  providers: [TaskService],
})
export class TaskModule {}
