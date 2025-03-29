import { AppDataSource } from "../../../config/database";
import { Client } from "../../../entities/client";
import { CreateClientDTO } from "../dtos/create";
import { UpdateClientDTO } from "../dtos/update";

export interface IClientsRepository {
  create(data: CreateClientDTO): Promise<Client>;
  update(data: UpdateClientDTO): Promise<Client>;
  delete(id: string): void;
  get(id: string): Promise<Client | null>;
  list(): Promise<Client[]>;
}

export class ClientsRepository implements IClientsRepository {
  repository = AppDataSource.getRepository(Client);

  async create(data: CreateClientDTO): Promise<Client> {
    const client = this.repository.save(data);

    return client;
  }

  update(data: UpdateClientDTO): Promise<Client> {
    const updatedClient = this.repository.save(data);

    return updatedClient;
  }

  delete(id: string): void {
    this.repository.delete({
      id,
    });
  }

  get(id: string): Promise<Client | null> {
    const client = this.repository.findOneBy({
      id,
    });

    return client;
  }

  list(): Promise<Client[]> {
    const clients = this.repository.find();

    return clients;
  }
}
