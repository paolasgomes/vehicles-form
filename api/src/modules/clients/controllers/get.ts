import { Request, Response } from "express";
import { GetClientService } from "../services/get";

export class GetClientController {
  static async handle(request: Request, response: Response) {
    const { id } = request.params;

    const getClientService = new GetClientService();

    const client = await getClientService.execute(id);

    response.status(200).json(client);
  }
}
