import { UpdateVehicleDTO } from "../dtos/update";
import {
  VehiclesRepository,
  IVehiclesRepository,
} from "../repositories/vehicle";

export class UpdateVehicleService {
  private vehiclesRepository: IVehiclesRepository;

  constructor(
    vehiclesRepository: IVehiclesRepository = new VehiclesRepository()
  ) {
    this.vehiclesRepository = vehiclesRepository;
  }

  async execute(data: UpdateVehicleDTO) {
    return this.vehiclesRepository.update(data);
  }
}
