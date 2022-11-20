import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransactionMigration1668914528075 implements MigrationInterface {
  name = 'TransactionMigration1668914528075';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transactionHash" character varying NOT NULL, "blockHash" character varying NOT NULL, "blockNumber" integer NOT NULL, "status" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_a629587e749dda5721fed9a5c39" UNIQUE ("blockNumber"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transactions"`);
  }
}
