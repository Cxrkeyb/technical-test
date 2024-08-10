import { Factura } from "@entities/index";

import { connection } from "..";

const facturaRepository = connection.getRepository(Factura);

export { facturaRepository as FacturaRepository };
