import { Cliente } from "@entities/index";

import { connection } from "..";

const clienteRepository = connection.getRepository(Cliente);

export { clienteRepository as ClienteRepository };
