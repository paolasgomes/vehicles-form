import {
  VehiclesRepository,
  IVehiclesRepository,
} from "../repositories/vehicle";

export class GetVehicleService {
  vehiclesRepository: IVehiclesRepository;

  constructor(vehiclesRepository = new VehiclesRepository()) {
    this.vehiclesRepository = vehiclesRepository;
  }

  async execute(id: string) {
    const vehicle = await this.vehiclesRepository.get(id);

    return vehicle;
  }
}
