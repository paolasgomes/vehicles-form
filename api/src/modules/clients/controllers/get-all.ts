import { Request, Response } from "express";
import { GetAllClientsService } from "../services/get-all";

export class GetAllClientsController {
  static async handle(request: Request, response: Response) {
    const getAllClientsService = new GetAllClientsService();

    const clients = await getAllClientsService.execute();

    response.status(200).json(clients);
  }
}
