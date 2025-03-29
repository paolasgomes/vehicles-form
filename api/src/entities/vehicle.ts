import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Client } from "./client";

@Entity("vehicles")
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  licensePlate!: string;

  @Column()
  model!: string;

  @Column()
  brand!: string;

  @Column("integer")
  yearOfManufacture!: number;

  @Column()
  color!: string;

  @Column({ unique: true })
  chassis!: string;

  @Column({ unique: true })
  renavam!: string;

  @Column()
  fuelType!: string;

  @ManyToOne(() => Client, (client) => client.vehicles, {
    nullable: false,
  })
  client!: Client;
}
