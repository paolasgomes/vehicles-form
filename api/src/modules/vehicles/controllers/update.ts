import { Request, Response } from "express";
import { UpdateVehicleService } from "../services/update";

export class UpdateVehicleController {
  static async handle(request: Request, response: Response) {
    const { clientId } = request.query;

    const updatedVehicle = {
      ...request.body,
      clientId,
    };

    const updateVehicleService = new UpdateVehicleService();

    await updateVehicleService.execute(updatedVehicle);

    response.status(204).send();
  }
}
