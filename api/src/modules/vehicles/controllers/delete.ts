import { Request, Response } from "express";
import { DeleteVehicleService } from "../services/delete";

export class DeleteVehicleController {
  static async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteVehicleService = new DeleteVehicleService();

    await deleteVehicleService.execute(id);

    response.status(204).send();
  }
}
