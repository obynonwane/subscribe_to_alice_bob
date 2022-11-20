import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1668774247266 implements MigrationInterface {
  name = 'InitialMigration1668774247266';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bobsubscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "parentHash" character varying NOT NULL, "blockNumber" integer NOT NULL, "stateRoot" character varying NOT NULL, "extrinsicsRoot" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_c41c89383c56ce815a90a1fb836" UNIQUE ("blockNumber"), CONSTRAINT "PK_d4c36e2da6747355f2b50062d1a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "alicesubscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "parentHash" character varying NOT NULL, "blockNumber" integer NOT NULL, "stateRoot" character varying NOT NULL, "extrinsicsRoot" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_27eb41939aac3d79d1a18e63118" UNIQUE ("blockNumber"), CONSTRAINT "PK_846b3c4af1e779131f779154d32" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "alicesubscriptions"`);
    await queryRunner.query(`DROP TABLE "bobsubscriptions"`);
  }
}
