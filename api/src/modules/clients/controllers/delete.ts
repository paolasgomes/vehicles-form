import { Request, Response } from "express";
import { DeleteClientService } from "../services/delete";

export class DeleteClientController {
  static async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteClientService = new DeleteClientService();

    await deleteClientService.execute(id);

    response.status(204).send();
  }
}
