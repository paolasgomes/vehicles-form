import { Request, Response } from "express";
import { CreateVehicleService } from "../services/create";

export class CreateVehicleController {
  static async handle(request: Request, response: Response) {
    const { clientId } = request.query;

    const createService = new CreateVehicleService();

    const data = {
      ...request.body,
      clientId,
    };

    const vehicle = await createService.execute(data);

    response.status(201).json(vehicle);
  }
}
