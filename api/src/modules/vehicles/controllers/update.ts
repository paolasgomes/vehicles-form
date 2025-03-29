import { Request, Response } from "express";
import { UpdateVehicleService } from "../services/update";

export class UpdateVehicleController {
  static async handle(request: Request, response: Response) {
    const { id } = request.params;

    const updatedVehicle = {
      ...request.body,
      id,
    };

    const updateVehicleService = new UpdateVehicleService();

    await updateVehicleService.execute(updatedVehicle);

    response.status(204).send();
  }
}
