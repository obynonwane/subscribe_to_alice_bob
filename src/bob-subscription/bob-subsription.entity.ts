import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'bobsubscriptions' })
export class BobSubscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  parentHash: string;

  @Column({ unique: true })
  blockNumber: number;

  @Column()
  stateRoot: string;

  @Column()
  extrinsicsRoot: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
