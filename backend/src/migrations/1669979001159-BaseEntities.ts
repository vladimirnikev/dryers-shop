import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseEntities1669979001159 implements MigrationInterface {
  name = 'BaseEntities1669979001159';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "calls" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "fullName" character varying NOT NULL, "message" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d9171d91f8dd1a649659f1b6a20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."carts_paymenttype_enum" AS ENUM('CASH', 'CARD', 'CARD-ONLINE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."carts_deliverytype_enum" AS ENUM('SHOP', 'POST')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."carts_posttype_enum" AS ENUM('OFFICE', 'COURIER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "carts" ("id" SERIAL NOT NULL, "sessionId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying NOT NULL DEFAULT '', "phone" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', "paymentType" "public"."carts_paymenttype_enum" NOT NULL DEFAULT 'CASH', "deliveryType" "public"."carts_deliverytype_enum" NOT NULL DEFAULT 'SHOP', "postType" "public"."carts_posttype_enum", "city" character varying NOT NULL DEFAULT '', "office" character varying NOT NULL DEFAULT '', "street" character varying NOT NULL DEFAULT '', "houseNumber" character varying NOT NULL DEFAULT '', "floor" character varying NOT NULL DEFAULT '', "entrance" character varying NOT NULL DEFAULT '', "apartmentNumber" character varying NOT NULL DEFAULT '', "isOrdered" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "item_record_entity" ("id" SERIAL NOT NULL, "count" integer NOT NULL DEFAULT '1', "colorId" integer, "cartId" integer, "itemId" integer, CONSTRAINT "PK_4f28fe16b0c1e73aa69b112fdde" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "colors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "nameUa" character varying NOT NULL DEFAULT '', "code" character varying NOT NULL DEFAULT '#000000', CONSTRAINT "PK_3a62edc12d29307872ab1777ced" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "manufacturers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "img" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_138520de32c379a48e703441975" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stocks" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL DEFAULT '', "nameUa" character varying NOT NULL DEFAULT '', "img" character varying NOT NULL DEFAULT '', "imgUa" character varying NOT NULL DEFAULT '', "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b5b1ee4ac914767229337974575" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."dryers_category_enum" AS ENUM('WATER', 'ELECTRICITY', 'COMBINE', 'ACCESSORIES')`,
    );
    await queryRunner.query(
      `CREATE TABLE "dryers" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL DEFAULT '', "nameUa" character varying NOT NULL DEFAULT '', "price" integer NOT NULL DEFAULT '0', "oldPrice" integer, "category" "public"."dryers_category_enum" NOT NULL DEFAULT 'WATER', "availability" boolean NOT NULL DEFAULT false, "imageUrls" text, "mainImg" character varying NOT NULL DEFAULT '', "description" character varying NOT NULL DEFAULT '', "descriptionUa" character varying NOT NULL DEFAULT '', "power" integer NOT NULL, "colorId" integer, "manufacturerId" integer, CONSTRAINT "PK_16bc16edca9392d392ed466cd02" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "name" character varying NOT NULL DEFAULT '', "surname" character varying NOT NULL DEFAULT '', "city" character varying NOT NULL DEFAULT '', "phone" character varying NOT NULL DEFAULT '', "role" character varying NOT NULL DEFAULT 'USER', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "text" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stocks_products_dryers" ("stocksId" integer NOT NULL, "dryersId" integer NOT NULL, CONSTRAINT "PK_ccb9e239377dd973509b83f5ad0" PRIMARY KEY ("stocksId", "dryersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_34bc3df97c6650fc07eaac491b" ON "stocks_products_dryers" ("stocksId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a624e15a730e6fa74c361ab908" ON "stocks_products_dryers" ("dryersId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "dryers_colors_colors" ("dryersId" integer NOT NULL, "colorsId" integer NOT NULL, CONSTRAINT "PK_efc1a53b8c94bec91d4cef03ea7" PRIMARY KEY ("dryersId", "colorsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_119290418208ffc2d87c899fe5" ON "dryers_colors_colors" ("dryersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f524da9bc5368a73806247fb10" ON "dryers_colors_colors" ("colorsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "item_record_entity" ADD CONSTRAINT "FK_b38c7f0eac7bbd5a9246723af68" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_record_entity" ADD CONSTRAINT "FK_a4f48fd34c4ed8b68e522b2eb3a" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_record_entity" ADD CONSTRAINT "FK_d1a3dd9b0f61271c635765ae052" FOREIGN KEY ("itemId") REFERENCES "dryers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "dryers" ADD CONSTRAINT "FK_0e6c14e70c591cca28c77ce1d44" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "dryers" ADD CONSTRAINT "FK_f71e2d47a97150e320b455806b2" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stocks_products_dryers" ADD CONSTRAINT "FK_34bc3df97c6650fc07eaac491b1" FOREIGN KEY ("stocksId") REFERENCES "stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "stocks_products_dryers" ADD CONSTRAINT "FK_a624e15a730e6fa74c361ab9087" FOREIGN KEY ("dryersId") REFERENCES "dryers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "dryers_colors_colors" ADD CONSTRAINT "FK_119290418208ffc2d87c899fe5b" FOREIGN KEY ("dryersId") REFERENCES "dryers"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "dryers_colors_colors" ADD CONSTRAINT "FK_f524da9bc5368a73806247fb106" FOREIGN KEY ("colorsId") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dryers_colors_colors" DROP CONSTRAINT "FK_f524da9bc5368a73806247fb106"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dryers_colors_colors" DROP CONSTRAINT "FK_119290418208ffc2d87c899fe5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stocks_products_dryers" DROP CONSTRAINT "FK_a624e15a730e6fa74c361ab9087"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stocks_products_dryers" DROP CONSTRAINT "FK_34bc3df97c6650fc07eaac491b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dryers" DROP CONSTRAINT "FK_f71e2d47a97150e320b455806b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "dryers" DROP CONSTRAINT "FK_0e6c14e70c591cca28c77ce1d44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_record_entity" DROP CONSTRAINT "FK_d1a3dd9b0f61271c635765ae052"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_record_entity" DROP CONSTRAINT "FK_a4f48fd34c4ed8b68e522b2eb3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_record_entity" DROP CONSTRAINT "FK_b38c7f0eac7bbd5a9246723af68"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_f524da9bc5368a73806247fb10"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_119290418208ffc2d87c899fe5"`);
    await queryRunner.query(`DROP TABLE "dryers_colors_colors"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a624e15a730e6fa74c361ab908"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_34bc3df97c6650fc07eaac491b"`);
    await queryRunner.query(`DROP TABLE "stocks_products_dryers"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "dryers"`);
    await queryRunner.query(`DROP TYPE "public"."dryers_category_enum"`);
    await queryRunner.query(`DROP TABLE "stocks"`);
    await queryRunner.query(`DROP TABLE "manufacturers"`);
    await queryRunner.query(`DROP TABLE "colors"`);
    await queryRunner.query(`DROP TABLE "item_record_entity"`);
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TYPE "public"."carts_posttype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."carts_deliverytype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."carts_paymenttype_enum"`);
    await queryRunner.query(`DROP TABLE "calls"`);
  }
}
