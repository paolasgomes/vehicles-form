import { Request, Response } from "express";
import { GetAllVehiclesService } from "../services/get-all";

export class GetAllVehiclesController {
  static async handle(request: Request, response: Response) {
    const getAllVehiclesService = new GetAllVehiclesService();

    const vehicles = await getAllVehiclesService.execute();

    response.status(200).json(vehicles);
  }
}
