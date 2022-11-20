import { Module } from '@nestjs/common';
import { AliceSubscriptionService } from './alice-subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AliceSubscription } from './alice-subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AliceSubscription])],
  providers: [AliceSubscriptionService],
})
export class AliceSubscriptionModule {}
