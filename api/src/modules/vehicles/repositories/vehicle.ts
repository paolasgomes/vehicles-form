import { AppDataSource } from "../../../config/database";
import { Vehicle } from "../../../entities/vehicle";
import { CreateVehicleDTO } from "../dtos/create";
import { UpdateVehicleDTO } from "../dtos/update";

export interface IVehiclesRepository {
  create(data: CreateVehicleDTO): Promise<Vehicle>;
  update(data: UpdateVehicleDTO): Promise<Vehicle>;
  delete(id: string): void;
  get(id: string): Promise<Vehicle | null>;
  list(): Promise<Vehicle[]>;
}

export class VehiclesRepository implements IVehiclesRepository {
  repository = AppDataSource.getRepository(Vehicle);

  async create(data: CreateVehicleDTO): Promise<Vehicle> {
    const vehicle = this.repository.save(data);

    return vehicle;
  }

  update(data: UpdateVehicleDTO): Promise<Vehicle> {
    const updatedVehicle = this.repository.save(data);

    return updatedVehicle;
  }

  delete(id: string): void {
    this.repository.delete({
      id,
    });
  }

  get(id: string): Promise<Vehicle | null> {
    const vehicle = this.repository.findOneBy({
      id,
    });

    return vehicle;
  }

  list(): Promise<Vehicle[]> {
    const vehicles = this.repository.find({
      relations: {
        client: true,
      },
    });

    return vehicles;
  }
}
