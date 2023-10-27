import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1698079869975 implements MigrationInterface {
  name = 'CreateTables1698079869975';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "email" character varying(128) NOT NULL, "firstName" character varying(128) NOT NULL, "lastName" character varying(128) NOT NULL, "provider" character varying(128) NOT NULL, "providerId" character varying(100) NOT NULL, "refreshToken" character varying(512) NOT NULL DEFAULT '', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "flights" ("id" BIGSERIAL NOT NULL, "departureCityId" bigint NOT NULL, "departureTime" TIMESTAMP WITH TIME ZONE NOT NULL, "arrivalCityId" bigint NOT NULL, "arrivalTime" TIMESTAMP WITH TIME ZONE NOT NULL, "code" integer NOT NULL, "price" numeric NOT NULL DEFAULT '0', "totalSeats" integer NOT NULL DEFAULT '0', "seatsAvailable" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_c614ef3382fdd70b6d6c2c8d8dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cities" ("id" BIGSERIAL NOT NULL, "name" character varying(128) NOT NULL, "code" character varying(3) NOT NULL, "countryId" bigint NOT NULL, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" BIGSERIAL NOT NULL, "name" character varying(128) NOT NULL, "code" character varying(3) NOT NULL, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_flights_flights" ("usersId" bigint NOT NULL, "flightsId" bigint NOT NULL, CONSTRAINT "PK_4396001a58012bc3cfc5ddc1596" PRIMARY KEY ("usersId", "flightsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c196fa187789af6dfa19347d32" ON "users_flights_flights" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0b625c0c76ec930163812d2a8c" ON "users_flights_flights" ("flightsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "FK_5c894f735ea6b9396feadaa82fa" FOREIGN KEY ("departureCityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" ADD CONSTRAINT "FK_55ac418dddb479b966d79c10ab4" FOREIGN KEY ("arrivalCityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" ADD CONSTRAINT "FK_b5f9bef6e3609b50aac3e103ab3" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_flights_flights" ADD CONSTRAINT "FK_c196fa187789af6dfa19347d325" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_flights_flights" ADD CONSTRAINT "FK_0b625c0c76ec930163812d2a8ca" FOREIGN KEY ("flightsId") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_flights_flights" DROP CONSTRAINT "FK_0b625c0c76ec930163812d2a8ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_flights_flights" DROP CONSTRAINT "FK_c196fa187789af6dfa19347d325"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" DROP CONSTRAINT "FK_b5f9bef6e3609b50aac3e103ab3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "FK_55ac418dddb479b966d79c10ab4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "flights" DROP CONSTRAINT "FK_5c894f735ea6b9396feadaa82fa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0b625c0c76ec930163812d2a8c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c196fa187789af6dfa19347d32"`,
    );
    await queryRunner.query(`DROP TABLE "users_flights_flights"`);
    await queryRunner.query(`DROP TABLE "countries"`);
    await queryRunner.query(`DROP TABLE "cities"`);
    await queryRunner.query(`DROP TABLE "flights"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
