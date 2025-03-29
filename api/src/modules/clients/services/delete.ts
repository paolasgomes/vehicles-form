import { ClientsRepository, IClientsRepository } from "../repositories/client";

export class DeleteClientService {
  clientsRepository: IClientsRepository;

  constructor(clientsRepository = new ClientsRepository()) {
    this.clientsRepository = clientsRepository;
  }

  async execute(id: string) {
    return this.clientsRepository.delete(id);
  }
}
