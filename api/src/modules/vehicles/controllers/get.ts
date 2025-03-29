import { Request, Response } from "express";
import { GetVehicleService } from "../services/get";

export class GetVehicleController {
  static async handle(request: Request, response: Response) {
    const { id } = request.params;

    const getVehicleService = new GetVehicleService();

    const vehicle = await getVehicleService.execute(id);

    response.status(200).json(vehicle);
  }
}
