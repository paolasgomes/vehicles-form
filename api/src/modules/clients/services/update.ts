import { UpdateClientDTO } from "../dtos/update";
import { ClientsRepository, IClientsRepository } from "../repositories/client";

export class UpdateClientService {
  private clientsRepository: IClientsRepository;

  constructor(clientsRepository: IClientsRepository = new ClientsRepository()) {
    this.clientsRepository = clientsRepository;
  }

  async execute(data: UpdateClientDTO) {
    return this.clientsRepository.update(data);
  }
}
