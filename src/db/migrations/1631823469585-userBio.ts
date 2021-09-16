import { MigrationInterface, QueryRunner } from 'typeorm';

export class userBio1631823469585 implements MigrationInterface {
  name = 'userBio1631823469585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "bio" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "bio"`);
  }
}
