import { Request, Response } from "express";
import { CreateClientService } from "../services/create";

export class CreateClientController {
  static async handle(request: Request, response: Response) {
    const createService = new CreateClientService();

    const client = await createService.execute(request.body);

    response.status(201).json(client);
  }
}
