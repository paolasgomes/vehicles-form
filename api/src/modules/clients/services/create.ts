import { CreateClientDTO } from "../dtos/create";
import { ClientsRepository, IClientsRepository } from "../repositories/client";

export class CreateClientService {
  private clientsRepository: IClientsRepository;

  constructor(clientsRepository: IClientsRepository = new ClientsRepository()) {
    this.clientsRepository = clientsRepository;
  }

  async execute(data: CreateClientDTO) {
    return this.clientsRepository.create(data);
  }
}
