import express from "express";
// clientRouter
import clientRouter from "@/web/modules/v1/client/router";

// facturaRouter
import facturaRouter from "@/web/modules/v1/factura/router";

const router = express.Router();

// cliente
router.use("/clientes", clientRouter);

// factura
router.use("/facturas", facturaRouter);

export default router;
