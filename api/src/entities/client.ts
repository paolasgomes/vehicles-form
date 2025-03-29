import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Vehicle } from "./vehicle";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  cpf!: string;

  @Column()
  phone!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  address!: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.client, {
    onDelete: "CASCADE",
  })
  vehicles!: Vehicle[];
}
