import { ClienteRepository } from "@/databases/mysql/repos";
import { Request, Response } from "express";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

/**
 * Crea un nuevo cliente.
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const createCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombreCliente, tipoIdentificacion, numeroIdentificacion, observaciones } = req.body;

    // Validación de campos obligatorios y longitud
    if (!nombreCliente || !tipoIdentificacion || !numeroIdentificacion) {
      res.status(400).json({ message: "Faltan campos obligatorios" });
      return;
    }
    if (nombreCliente.length > 100 || tipoIdentificacion.length > 100 || numeroIdentificacion.length > 100 || (observaciones && observaciones.length > 1000)) {
      res.status(400).json({ message: "Algunos campos tienen longitud excesiva" });
      return;
    }

    // Creación y guardado del cliente
    const cliente = ClienteRepository.create({ nombreCliente, tipoIdentificacion, numeroIdentificacion, observaciones });
    await ClienteRepository.save(cliente);

    res.status(201).json(cliente);
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene la lista de todos los clientes.
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const getClientes = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientes = await ClienteRepository.find();
    const resClients = clientes.map(cliente => ({ value: cliente.id, label: cliente.nombreCliente }));
    res.status(200).json(resClients);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene clientes con paginación y filtros.
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const getClientesPaginacion = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const idFilter = req.query.id as string;
    const startDateFilter = req.query.startDate as string;
    const endDateFilter = req.query.endDate as string;
    const startIndex = (page - 1) * limit;

    const whereConditions: any[] = [];

    // Función auxiliar para convertir fechas
    const convertToISODate = (dateString: string): string => {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    };

    // Aplicar filtros de fecha y ID
    if (startDateFilter && endDateFilter) {
      whereConditions.push({ fecha: Between(new Date(convertToISODate(startDateFilter)), new Date(new Date(convertToISODate(endDateFilter)).setHours(23, 59, 59, 999))) });
    } else if (startDateFilter) {
      whereConditions.push({ fecha: MoreThanOrEqual(new Date(convertToISODate(startDateFilter))) });
    } else if (endDateFilter) {
      whereConditions.push({ fecha: LessThanOrEqual(new Date(new Date(convertToISODate(endDateFilter)).setHours(23, 59, 59, 999))) });
    }
    if (idFilter) {
      whereConditions.push({ id: idFilter });
    }

    const [clientes, total] = await ClienteRepository.findAndCount({
      where: whereConditions,
      skip: startIndex,
      take: limit,
      select: ["id", "nombreCliente", "tipoIdentificacion", "numeroIdentificacion", "observaciones"]
    });

    res.status(200).json({ data: clientes, total });
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene un cliente por su ID.
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const getCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Falta el ID del cliente" });
      return;
    }

    const cliente = await ClienteRepository.findOne({ where: { id } });
    if (!cliente) {
      res.status(404).json({ message: "Cliente no encontrado" });
      return;
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Actualiza los datos de un cliente existente.
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const updateCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombreCliente, tipoIdentificacion, numeroIdentificacion, observaciones } = req.body;

    if (!id) {
      res.status(400).json({ message: "Falta el ID del cliente" });
      return;
    }

    // Validación de datos a actualizar
    if (!nombreCliente && !tipoIdentificacion && !numeroIdentificacion && !observaciones) {
      res.status(400).json({ message: "Falta el cuerpo de la petición" });
      return;
    }
    if (nombreCliente && nombreCliente.length > 100 || tipoIdentificacion && tipoIdentificacion.length > 100 || numeroIdentificacion && numeroIdentificacion.length > 100 || observaciones && observaciones.length > 1000) {
      res.status(400).json({ message: "Algunos campos tienen longitud excesiva" });
      return;
    }

    const cliente = await ClienteRepository.findOne({ where: { id } });
    if (!cliente) {
      res.status(404).json({ message: "Cliente no encontrado" });
      return;
    }

    // Actualización del cliente
    cliente.nombreCliente = nombreCliente || cliente.nombreCliente;
    cliente.tipoIdentificacion = tipoIdentificacion || cliente.tipoIdentificacion;
    cliente.numeroIdentificacion = numeroIdentificacion || cliente.numeroIdentificacion;
    cliente.observaciones = observaciones || cliente.observaciones;

    await ClienteRepository.save(cliente);
    res.status(200).json(cliente);
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Elimina un cliente por su ID.
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const deleteCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Falta el ID del cliente" });
      return;
    }

    const cliente = await ClienteRepository.findOne({ where: { id } });
    if (!cliente) {
      res.status(404).json({ message: "Cliente no encontrado" });
      return;
    }

    await ClienteRepository.delete(id);
    res.status(200).json({ message: "Cliente eliminado" });
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export {
  createCliente,
  getClientes,
  getCliente,
  updateCliente,
  deleteCliente,
  getClientesPaginacion
};
