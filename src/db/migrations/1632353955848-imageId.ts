import { MigrationInterface, QueryRunner } from 'typeorm';

export class imageId1632353955848 implements MigrationInterface {
  name = 'imageId1632353955848';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."posts" ADD "image_id" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."posts" DROP COLUMN "image_id"`,
    );
  }
}
