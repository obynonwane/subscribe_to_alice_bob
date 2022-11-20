import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BobSubscriptionService } from './bob-subscription.service';
import { BobSubscription } from './bob-subsription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BobSubscription])],
  providers: [BobSubscriptionService],
})
export class BobSubscriptionModule {}
