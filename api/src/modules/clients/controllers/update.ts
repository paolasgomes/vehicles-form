import { Request, Response } from "express";
import { UpdateClientService } from "../services/update";

export class UpdateClientController {
  static async handle(request: Request, response: Response) {
    const { id } = request.params;

    const updatedClient = {
      ...request.body,
      id,
    };

    const updateClientService = new UpdateClientService();

    await updateClientService.execute(updatedClient);

    response.status(204).send();
  }
}
