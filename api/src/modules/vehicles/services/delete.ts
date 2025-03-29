import {
  VehiclesRepository,
  IVehiclesRepository,
} from "../repositories/vehicle";

export class DeleteVehicleService {
  clientsRepository: IVehiclesRepository;

  constructor(clientsRepository = new VehiclesRepository()) {
    this.clientsRepository = clientsRepository;
  }

  async execute(id: string) {
    return this.clientsRepository.delete(id);
  }
}
