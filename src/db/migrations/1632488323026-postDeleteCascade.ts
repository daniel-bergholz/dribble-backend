import { MigrationInterface, QueryRunner } from 'typeorm';

export class postDeleteCascade1632488323026 implements MigrationInterface {
  name = 'postDeleteCascade1632488323026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
