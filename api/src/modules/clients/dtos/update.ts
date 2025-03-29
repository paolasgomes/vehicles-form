import { CreateClientDTO } from "./create";

export type UpdateClientDTO = Partial<CreateClientDTO> & { id: string };
