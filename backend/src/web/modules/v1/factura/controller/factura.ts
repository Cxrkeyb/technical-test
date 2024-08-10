import { ClienteRepository, FacturaRepository } from "@/databases/mysql/repos";
import { Request, Response } from "express";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

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

    // Validación de valor de descuento
    if (valorDescuento !== undefined && (valorDescuento < 0 || valorDescuento > 50)) {
      res.status(400).json({ message: "El valor del descuento debe estar entre 0 y 50" });
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
    res.status(200).json(facturas);
  } catch (error) {
    console.error("Error al obtener las facturas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene la lista de todas las facturas con paginación y filtros opcionales.
 *
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const getFacturasPagination = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const idFilter = req.query.id as string;
    const startDateFilter = req.query.startDate as string;
    const endDateFilter = req.query.endDate as string;

    const startIndex = (page - 1) * limit;

    const whereConditions: any = [];

    // Helper function to convertir DD/MM/YYYY a YYYY-MM-DD
    const convertToISODate = (dateString: string): string => {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    };

    // Agregar filtros de fecha si se proporcionan
    if (startDateFilter && endDateFilter) {
      whereConditions.push({
        fecha: Between(
          new Date(convertToISODate(startDateFilter)),
          new Date(new Date(convertToISODate(endDateFilter)).setHours(23, 59, 59, 999))
        )
      });
    } else if (startDateFilter) {
      whereConditions.push({
        fecha: MoreThanOrEqual(new Date(convertToISODate(startDateFilter)))
      });
    } else if (endDateFilter) {
      whereConditions.push({
        fecha: LessThanOrEqual(
          new Date(new Date(convertToISODate(endDateFilter)).setHours(23, 59, 59, 999))
        )
      });
    }

    // Agregar filtro de ID si se proporciona
    if (idFilter) {
      whereConditions.push({
        cliente: { id: idFilter }
      });
    }

    const [facturas, total] = await FacturaRepository.findAndCount({
      where: whereConditions,
      skip: startIndex,
      take: limit,
      relations: ["cliente"],
      select: [
        "id",
        "nombreProducto",
        "precio",
        "cliente",
        "fecha",
        "valorDescuento",
        "iva",
        "valorTotal"
      ]
    });

    // Formatear los datos para la respuesta
    const formattedFacturas = facturas.map((factura) => ({
      id: factura.id,
      nombreProducto: factura.nombreProducto,
      precio: factura.precio,
      cliente: factura.cliente.nombreCliente,
      fecha: factura.fecha,
      valorDescuento: factura.valorDescuento,
      iva: factura.iva,
      valorTotal: factura.valorTotal
    }));

    res.status(200).json({ data: formattedFacturas, total });
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

    // Validación de valor de descuento
    if (valorDescuento !== undefined && (valorDescuento < 0 || valorDescuento > 50)) {
      res.status(400).json({ message: "El valor del descuento debe estar entre 0 y 50" });
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

    // Actualización de la factura
    factura.cliente = clienteId ? await ClienteRepository.findOne({ where: { id: clienteId } }) || factura.cliente : factura.cliente;
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
      return;
    }

    // Eliminación de la factura
    await FacturaRepository.delete(id);

    res.status(200).json({ message: "Factura eliminada" });
  } catch (error) {
    console.error("Error al eliminar la factura:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export {
  createFactura,
  getFacturas,
  getFactura,
  updateFactura,
  deleteFactura,
  getFacturasPagination
};
