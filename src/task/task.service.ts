import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { BobSubscription } from '../bob-subscription/bob-subsription.entity';
import { Repository } from 'typeorm';
import { AliceSubscription } from '../alice-subscription/alice-subscription.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
import { readFileSync } from 'fs';
import { join } from 'path';
import { Transaction } from '../transaction/transaction.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Provider = require('@truffle/hdwallet-provider');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
const web3 = new Web3(process.env.RPC_URL);

const ContractABI = JSON.parse(
  readFileSync(
    join(path.resolve('./'), `sol_contracts/build/contracts/Blocks.json`),
    'utf-8',
  ),
);

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(BobSubscription)
    private bobRepository: Repository<BobSubscription>,
    @InjectRepository(AliceSubscription)
    private aliceRepository: Repository<AliceSubscription>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  // @Cron('45 * * * * *')
  async compareAliceAndBobRecord() {
    try {
      //fetch Alice records
      const aliceRecords = await this.aliceRepository.find({
        where: { verified: false },
      });

      //loop through alice records
      for (let i = 0; i < aliceRecords.length; i++) {
        // console.log(aliceRecords[i].blockNumber);

        //find bob record
        const bobRecord = await this.bobRepository.findOneBy({
          blockNumber: aliceRecords[i].blockNumber,
          verified: false,
        });
        if (bobRecord) {
          const parentHash: string = bobRecord.parentHash;
          const blockNumber: number = bobRecord.blockNumber;
          const stateRoot: string = bobRecord.stateRoot;
          const extrinsicsRoot: string = bobRecord.extrinsicsRoot;
          const pushResult = await this.pushSubscribedBlockToSmartContract(
            parentHash,
            blockNumber,
            stateRoot,
            extrinsicsRoot,
          );
          console.log(pushResult);
          if (pushResult.status) {
            //create transaction
            await this.transactionRepository.save({
              transactionHash: pushResult.transactionHash,
              blockHash: pushResult.blockHash,
              blockNumber: pushResult.blockNumber,
              status: pushResult.status,
            });

            //update bob verified statuses
            bobRecord.verified = true;
            await this.bobRepository.save(bobRecord);

            //update alice verified status
            const aliceRec = await this.aliceRepository.findOneBy({
              blockNumber: bobRecord.blockNumber,
            });

            aliceRec.verified = true;
            await this.aliceRepository.save(aliceRec);
          }
        } else {
          // console.log(
          //   `${bobRecord.blockNumber}: Block  Does not exist for both Alic and BOB`,
          // );
        }
      }
      //loothrough
    } catch (error) {
      console.log(error);
    }
  }

  web3Objt() {
    const provider = new Provider(process.env.PRIVATE_KEY, process.env.RPC_URL);
    const web3 = new Web3(provider);
    const myContract = new web3.eth.Contract(
      ContractABI.abi,
      process.env.CONTRACT_ADDRESS,
    );

    return myContract;
  }
  async pushSubscribedBlockToSmartContract(
    parentHash: string,
    blockNumber: number,
    stateRoot: string,
    extrinsicsRoot: string,
  ) {
    const receipt = this.web3Objt()
      .methods.addBlockDetails(
        parentHash,
        blockNumber,
        stateRoot,
        extrinsicsRoot,
      )
      .send({ from: process.env.CONTRACT_OWNER_ADDRESS });
    console.log(receipt);

    return receipt;
  }

  /**
   * Return blocks details added limit 5
   * @returns Return
   */
  async getBlockAdded() {
    const blockdetails = this.web3Objt().methods.returnMappingData(1, 5).call();
    return blockdetails;
  }

  /**
   * Get Total number of Blocks Added
   * @returns
   */
  async getBlockCount() {
    const blockCount = this.web3Objt().methods.blockCount().call();
    return blockCount;
  }

  async getBlockIndividualBlockCount(param) {
    const blockCount = this.web3Objt().methods.blocks(param).call();
    return blockCount;
  }

  // @Cron('45 * * * * *')
  async getAccounts() {
    // console.log(ContractABI.abi);
    // const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
  }

  // @Cron('* * * * * *')
  async transferFunds() {
    //create transaction
    const createTransaction = await web3.eth.accounts.signTransaction(
      {
        from: process.env.CONTRACT_OWNER_ADDRESS,
        to: process.env.RECIEVER_ADDRES,
        value: web3.utils.toWei('2', 'ether'),
        gas: 21000,
      },
      process.env.PRIVATE_KEY,
    );

    //send signed transaction
    const receipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction,
    );
    console.log(
      `Transaction succesfully executed with hash: ${receipt.transactionHash}`,
    );
  }
}
