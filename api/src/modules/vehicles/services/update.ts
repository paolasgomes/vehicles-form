import {
  ClientsRepository,
  IClientsRepository,
} from "../../clients/repositories/client";
import { UpdateVehicleDTO } from "../dtos/update";
import {
  VehiclesRepository,
  IVehiclesRepository,
} from "../repositories/vehicle";

export class UpdateVehicleService {
  private vehiclesRepository: IVehiclesRepository;
  private clientsRepository: IClientsRepository;

  constructor(
    vehiclesRepository: IVehiclesRepository = new VehiclesRepository(),
    clientsRepository: IClientsRepository = new ClientsRepository()
  ) {
    this.vehiclesRepository = vehiclesRepository;
    this.clientsRepository = clientsRepository;
  }

  async execute(data: UpdateVehicleDTO & { clientId: string }) {
    const { clientId, ...rest } = data;

    const client = await this.clientsRepository.get(clientId);

    if (!client) {
      throw new Error("Vehicle not found");
    }

    const vehicle = this.vehiclesRepository.update({
      ...rest,
      client,
    });

    return vehicle;
  }
}
