import {
  createCliente,
  deleteCliente,
  getCliente,
  getClientes,
  updateCliente
} from "@/web/modules/v1/client/controller/client";
import express from "express";

const router = express.Router();

router.get("/", getClientes);
router.post("/", createCliente);
router.get("/:id", getCliente);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);

export default router;

/**
 * Swagger docs:
 * @openapi
 * tags:
 *   - name: Cliente
 *     description: Operaciones relacionadas con el cliente
 */

/**
 * @openapi
 * /v1/clientes:
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags:
 *       - Cliente
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       500:
 *         description: Error interno del servidor
 *
 *   post:
 *     summary: Crea un cliente
 *     tags:
 *       - Cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente creado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * /v1/clientes/{id}:
 *   get:
 *     summary: Obtiene un cliente
 *     tags:
 *       - Cliente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       500:
 *         description: Error interno del servidor
 *
 *   put:
 *     summary: Actualiza un cliente
 *     tags:
 *       - Cliente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Elimina un cliente
 *     tags:
 *       - Cliente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente eliminado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - nombreCliente
 *         - tipoIdentificacion
 *         - numeroIdentificacion
 *       properties:
 *         nombreCliente:
 *           type: string
 *           description: Nombre del cliente
 *         tipoIdentificacion:
 *           type: string
 *           description: Tipo de identificación del cliente
 *         numeroIdentificacion:
 *           type: string
 *           description: Número de identificación del cliente
 *         observaciones:
 *           type: string
 *           description: Observaciones del cliente
 *       example:
 *         nombreCliente: Juan Perez
 *         tipoIdentificacion: CC
 *         numeroIdentificacion: 123456789
 *         observaciones: Cliente frecuente
 */
