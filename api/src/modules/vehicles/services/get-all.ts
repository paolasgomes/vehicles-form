import {
  VehiclesRepository,
  IVehiclesRepository,
} from "../repositories/vehicle";

export class GetAllVehiclesService {
  vehiclesRepository: IVehiclesRepository;

  constructor(vehiclesRepository = new VehiclesRepository()) {
    this.vehiclesRepository = vehiclesRepository;
  }

  async execute() {
    const vehicles = await this.vehiclesRepository.list();

    return vehicles;
  }
}
