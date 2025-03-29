import { Router } from "express";
import { GetAllClientsController } from "../controllers/get-all";
import { GetClientController } from "../controllers/get";
import { UpdateClientController } from "../controllers/update";
import { CreateClientController } from "../controllers/create";
import { DeleteClientController } from "../controllers/delete";

const clientsRoutes = Router();

clientsRoutes.get("/", GetAllClientsController.handle);

clientsRoutes.get("/:id", GetClientController.handle);

clientsRoutes.patch("/:id", UpdateClientController.handle);

clientsRoutes.post("/", CreateClientController.handle);

clientsRoutes.delete("/:id", DeleteClientController.handle);

export { clientsRoutes };
