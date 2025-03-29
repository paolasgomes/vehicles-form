import { Client } from "../../../entities/client";

export type CreateVehicleDTO = {
  licensePlate: string;
  model: string;
  brand: string;
  yearOfManufacture: number;
  color: string;
  chassis: string;
  renavam: string;
  fuelType: string;
  client: Client;
};
