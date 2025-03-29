import {
  ClientsRepository,
  IClientsRepository,
} from "../../clients/repositories/client";
import { CreateVehicleDTO } from "../dtos/create";
import {
  VehiclesRepository,
  IVehiclesRepository,
} from "../repositories/vehicle";

export class CreateVehicleService {
  private vehiclesRepository: IVehiclesRepository;
  private clientsRepository: IClientsRepository;

  constructor(
    vehiclesRepository: IVehiclesRepository = new VehiclesRepository(),
    clientsRepository: IClientsRepository = new ClientsRepository()
  ) {
    this.vehiclesRepository = vehiclesRepository;
    this.clientsRepository = clientsRepository;
  }

  async execute(data: CreateVehicleDTO & { clientId: string }) {
    const { clientId, ...rest } = data;

    const client = await this.clientsRepository.get(clientId);

    if (!client) {
      throw new Error("Client not found");
    }

    const vehicle = this.vehiclesRepository.create({
      ...rest,
      client,
    });

    return vehicle;
  }
}
