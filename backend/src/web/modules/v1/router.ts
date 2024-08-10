import express from "express";
// clientRouter
import clientRouter from "@/web/modules/v1/client/router";

const router = express.Router();

// client
router.use("/clientes", clientRouter);

export default router;
