import { Router } from "express";
import { GetAllVehiclesController } from "../controllers/get-all";
import { GetVehicleController } from "../controllers/get";
import { UpdateVehicleController } from "../controllers/update";
import { CreateVehicleController } from "../controllers/create";
import { DeleteVehicleController } from "../controllers/delete";

const vehiclesRoutes = Router();

vehiclesRoutes.get("/", GetAllVehiclesController.handle);

vehiclesRoutes.get("/:id", GetVehicleController.handle);

vehiclesRoutes.patch("/:id", UpdateVehicleController.handle);

vehiclesRoutes.post("/", CreateVehicleController.handle);

vehiclesRoutes.delete("/:id", DeleteVehicleController.handle);

export { vehiclesRoutes };
