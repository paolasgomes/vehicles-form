import { ClientsRepository, IClientsRepository } from "../repositories/client";

export class GetAllClientsService {
  clientsRepository: IClientsRepository;

  constructor(clientsRepository = new ClientsRepository()) {
    this.clientsRepository = clientsRepository;
  }

  async execute() {
    const clients = await this.clientsRepository.list();

    return clients;
  }
}
