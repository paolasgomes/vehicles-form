import { ClientsRepository, IClientsRepository } from "../repositories/client";

export class GetClientService {
  clientsRepository: IClientsRepository;

  constructor(clientsRepository = new ClientsRepository()) {
    this.clientsRepository = clientsRepository;
  }

  async execute(id: string) {
    const client = await this.clientsRepository.get(id);

    return client;
  }
}
