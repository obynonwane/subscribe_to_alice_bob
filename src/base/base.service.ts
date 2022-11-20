import { Injectable } from '@nestjs/common';
import { BobSubscription } from '../bob-subscription/bob-subsription.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AliceSubscription } from '../alice-subscription/alice-subscription.entity';

@Injectable()
export class BaseService {
  constructor(
    @InjectRepository(BobSubscription)
    private bobRepository: Repository<BobSubscription>,
    @InjectRepository(AliceSubscription)
    private aliceRepository: Repository<AliceSubscription>,
  ) {}

  async alice(details) {
    try {
      //check if block exist
      const checkifExist = await this.aliceRepository.findOneBy({
        blockNumber: details.number,
      });
      if (!checkifExist) {
        const createBobRec = this.aliceRepository.create({
          parentHash: details.parentHash,
          blockNumber: details.number,
          stateRoot: details.stateRoot,
          extrinsicsRoot: details.extrinsicsRoot,
        });
        await this.aliceRepository.save(createBobRec);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(details, 'alice');
  }
  async bob(details) {
    try {
      //check if block exist
      const checkifExist = await this.bobRepository.findOneBy({
        blockNumber: details.number,
      });
      if (!checkifExist) {
        const createBobRec = this.bobRepository.create({
          parentHash: details.parentHash,
          blockNumber: details.number,
          stateRoot: details.stateRoot,
          extrinsicsRoot: details.extrinsicsRoot,
        });
        await this.bobRepository.save(createBobRec);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(details, 'Bob');
  }
}
