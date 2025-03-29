import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateClientsAndVehiclesTables1681234567890
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clients",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "cpf",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "phone",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "address",
            type: "varchar",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "vehicles",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "licensePlate",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "model",
            type: "varchar",
          },
          {
            name: "brand",
            type: "varchar",
          },
          {
            name: "yearOfManufacture",
            type: "integer",
          },
          {
            name: "color",
            type: "varchar",
          },
          {
            name: "chassis",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "renavam",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "fuelType",
            type: "varchar",
          },
          {
            name: "clientId",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "vehicles",
      new TableForeignKey({
        columnNames: ["clientId"],
        referencedTableName: "clients",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("vehicles", "FK_clientId");

    await queryRunner.dropTable("vehicles");

    await queryRunner.dropTable("clients");
  }
}
