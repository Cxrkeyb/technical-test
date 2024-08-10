import { ClienteRepository, FacturaRepository } from "@/databases/mysql/repos";
import { Request, Response } from "express";

/**
 * Crea una nueva factura.
 *
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const createFactura = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clienteId, fecha, nombreProducto, precio, valorDescuento, iva, valorTotal } = req.body;

    // Validación de campos obligatorios
    if (!clienteId || !fecha || !nombreProducto || !precio || !valorTotal) {
      res.status(400).json({ message: "Faltan campos obligatorios" });
      return;
    }

    // Validación de longitud de campos
    if (nombreProducto.length > 150) {
      res.status(400).json({ message: "El nombre del producto es muy largo" });
      return;
    }

    // Formatear la fecha a un formato aceptable por MySQL
    const formattedDate = new Date(fecha).toISOString().slice(0, 19).replace("T", " ");

    // Creación de la factura
    const factura = FacturaRepository.create({
      cliente: { id: clienteId },
      fecha: formattedDate,
      nombreProducto,
      precio,
      valorDescuento: valorDescuento || 0,
      iva: iva || 0,
      valorTotal
    });
    await FacturaRepository.save(factura);

    // Respuesta exitosa
    res.status(201).json(factura);
  } catch (error) {
    console.error("Error al crear la factura:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene la lista de todas las facturas.
 *
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const getFacturas = async (req: Request, res: Response): Promise<void> => {
  try {
    const facturas = await FacturaRepository.find({ relations: ["cliente"] });
    res.json(facturas);
  } catch (error) {
    console.error("Error al obtener las facturas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene una factura por su ID.
 *
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const getFactura = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Falta el ID de la factura" });
      return;
    }

    // Búsqueda de la factura
    const factura = await FacturaRepository.findOne({
      where: { id },
      relations: ["cliente"]
    });

    if (!factura) {
      res.status(404).json({ message: "Factura no encontrada" });
      return;
    }

    res.status(200).json(factura);
  } catch (error) {
    console.error("Error al obtener la factura:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Actualiza los datos de una factura existente.
 *
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const updateFactura = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { clienteId, fecha, nombreProducto, precio, valorDescuento, iva, valorTotal } = req.body;

    if (!id) {
      res.status(400).json({ message: "Falta el ID de la factura" });
      return;
    }

    // Validación de campos a actualizar
    if (
      !clienteId &&
      !fecha &&
      !nombreProducto &&
      !precio &&
      !valorDescuento &&
      !iva &&
      !valorTotal
    ) {
      res.status(400).json({ message: "Falta el cuerpo de la petición" });
      return;
    }

    // Validación de longitud de campos
    if (nombreProducto && nombreProducto.length > 150) {
      res.status(400).json({ message: "El nombre del producto es muy largo" });
      return;
    }

    // Búsqueda de la factura
    const factura = await FacturaRepository.findOne({
      where: { id }
    });

    if (!factura) {
      res.status(404).json({ message: "Factura no encontrada" });
      return;
    }

    const client = await ClienteRepository.findOne({ where: { id: clienteId } });

    if (!client) {
      res.status(404).json({ message: "Cliente no encontrado" });
      return;
    }

    // Actualización de la factura
    factura.cliente = client || factura.cliente;
    factura.fecha = fecha || factura.fecha;
    factura.nombreProducto = nombreProducto || factura.nombreProducto;
    factura.precio = precio || factura.precio;
    factura.valorDescuento = valorDescuento !== undefined ? valorDescuento : factura.valorDescuento;
    factura.iva = iva !== undefined ? iva : factura.iva;
    factura.valorTotal = valorTotal || factura.valorTotal;

    await FacturaRepository.save(factura);

    res.status(200).json(factura);
  } catch (error) {
    console.error("Error al actualizar la factura:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Elimina una factura por su ID.
 *
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const deleteFactura = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Falta el ID de la factura" });
      return;
    }

    // Búsqueda de la factura
    const factura = await FacturaRepository.findOne({
      where: { id }
    });

    if (!factura) {
      res.status(404).json({ message: "Factura no encontrada" });
    }

    // Eliminación de la factura
    await FacturaRepository.delete(id);

    res.status(200).json({ message: "Factura eliminada" });
  } catch (error) {
    console.error("Error al eliminar la factura:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export { createFactura, getFacturas, getFactura, updateFactura, deleteFactura };
