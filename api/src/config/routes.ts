import { Router } from "express";
import { clientsRoutes } from "../modules/clients/routes";
import { vehiclesRoutes } from "../modules/vehicles/routes";

const routes = Router();

routes.use("/clients", clientsRoutes);
routes.use("/vehicles", vehiclesRoutes);

export { routes };
