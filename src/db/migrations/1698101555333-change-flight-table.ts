import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeFlightTable1698101555333 implements MigrationInterface {
    name = 'ChangeFlightTable1698101555333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" ADD "airline" character varying(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_5c894f735ea6b9396feadaa82fa"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_55ac418dddb479b966d79c10ab4"`);
        await queryRunner.query(`ALTER TABLE "flights" ALTER COLUMN "departureCityId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" ALTER COLUMN "arrivalCityId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_b5f9bef6e3609b50aac3e103ab3"`);
        await queryRunner.query(`ALTER TABLE "cities" ALTER COLUMN "countryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_5c894f735ea6b9396feadaa82fa" FOREIGN KEY ("departureCityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_55ac418dddb479b966d79c10ab4" FOREIGN KEY ("arrivalCityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_b5f9bef6e3609b50aac3e103ab3" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_b5f9bef6e3609b50aac3e103ab3"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_55ac418dddb479b966d79c10ab4"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_5c894f735ea6b9396feadaa82fa"`);
        await queryRunner.query(`ALTER TABLE "cities" ALTER COLUMN "countryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_b5f9bef6e3609b50aac3e103ab3" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ALTER COLUMN "arrivalCityId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" ALTER COLUMN "departureCityId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_55ac418dddb479b966d79c10ab4" FOREIGN KEY ("arrivalCityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_5c894f735ea6b9396feadaa82fa" FOREIGN KEY ("departureCityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "airline"`);
    }

}
