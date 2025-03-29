import { CreateVehicleDTO } from "./create";

export type UpdateVehicleDTO = Partial<CreateVehicleDTO> & { id: string };
