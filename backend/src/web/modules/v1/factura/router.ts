import {
  createFactura,
  deleteFactura,
  getFactura,
  getFacturas,
  updateFactura,
  getFacturasPagination
} from "@/web/modules/v1/factura/controller/factura";
import express from "express";

const router = express.Router();

router.get("/", getFacturas);
router.get("/paginacion", getFacturasPagination);
router.post("/", createFactura);
router.get("/:id", getFactura);
router.put("/:id", updateFactura);
router.delete("/:id", deleteFactura);

export default router;

/**
 * Swagger docs:
 * @openapi
 * tags:
 *   - name: Factura
 *     description: Operaciones relacionadas con la factura
 */

/**
 * @openapi
 * /v1/facturas:
 *   get:
 *     summary: Obtiene todas las facturas
 *     tags:
 *       - Factura
 *     responses:
 *       200:
 *         description: Lista de facturas
 *       500:
 *         description: Error interno del servidor
 *
 *   post:
 *     summary: Crea una factura
 *     tags:
 *       - Factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       201:
 *         description: Factura creada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * /v1/facturas/{id}:
 *   get:
 *     summary: Obtiene una factura
 *     tags:
 *       - Factura
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la factura (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Factura encontrada
 *       500:
 *         description: Error interno del servidor
 *
 *   put:
 *     summary: Actualiza una factura
 *     tags:
 *       - Factura
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la factura (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       200:
 *         description: Factura actualizada
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Elimina una factura
 *     tags:
 *       - Factura
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la factura (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Factura eliminada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Factura:
 *       type: object
 *       required:
 *         - clienteId
 *         - fecha
 *         - nombreProducto
 *         - precio
 *         - valorTotal
 *       properties:
 *         clienteId:
 *           type: string
 *           format: uuid
 *           description: ID del cliente asociado (UUID)
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha de la factura
 *         nombreProducto:
 *           type: string
 *           description: Nombre del producto
 *         precio:
 *           type: number
 *           format: decimal
 *           description: Precio del producto
 *         valorDescuento:
 *           type: number
 *           format: decimal
 *           description: Valor del descuento aplicado
 *         iva:
 *           type: number
 *           format: decimal
 *           description: IVA aplicado
 *         valorTotal:
 *           type: number
 *           format: decimal
 *           description: Valor total de la factura
 *       example:
 *         clienteId: "123e4567-e89b-12d3-a456-426614174000"
 *         fecha: "2024-08-10"
 *         nombreProducto: "Laptop"
 *         precio: 1200.00
 *         valorDescuento: 100.00
 *         iva: 19.00
 *         valorTotal: 1319.00
 */
