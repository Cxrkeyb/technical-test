import { ClienteRepository } from "@/databases/mysql/repos";
import { Request, Response } from "express";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

/**
 * Crea un nuevo cliente.
 *
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const createCliente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombreCliente, tipoIdentificacion, numeroIdentificacion, observaciones } = req.body;

    // Validación de campos obligatorios
    if (!nombreCliente || !tipoIdentificacion || !numeroIdentificacion) {
      res.status(400).json({ message: "Faltan campos obligatorios" });
      return;
    }

    // Validación de longitud de campos
    if (nombreCliente.length > 100) {
      res.status(400).json({ message: "El nombre del cliente es muy largo" });
      return;
    }

    if (tipoIdentificacion.length > 100) {
      res.status(400).json({ message: "El tipo de identificación es muy largo" });
      return;
    }

    if (numeroIdentificacion.length > 100) {
      res.status(400).json({ message: "El número de identificación es muy largo" });
      return;
    }

    if (observaciones && observaciones.length > 1000) {
      res.status(400).json({ message: "Las observaciones son muy largas" });
      return;
    }

    // Creación del cliente
    const cliente = ClienteRepository.create({
      nombreCliente,
      tipoIdentificacion,
      numeroIdentificacion,
      observaciones
    });
    await ClienteRepository.save(cliente);

    // Respuesta exitosa
    res.status(201).json(cliente);
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene la lista de todos los clientes.
 *
 * @param req - La solicitud HTTP.
 * @param res - La respuesta HTTP.
 */
const getClientes = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientes = await ClienteRepository.find();

    const resClients = clientes.map((cliente) => {
      return {
        value: cliente.id,
        label: cliente.nombreCliente
      };
    });
    res.status(200).json(resClients);
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
* Obtiene la lista de todos los clientes con paginación.
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

    const whereConditions: any = [];

    // Helper function to convert DD/MM/YYYY to YYYY-MM-DD
    const convertToISODate = (dateString: string): string => {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    };

    // Agregar filtros de fecha si se proporcionan
    if (startDateFilter && endDateFilter) {
      whereConditions.push({
        created_at: Between(
          new Date(convertToISODate(startDateFilter)),
          new Date(new Date(convertToISODate(endDateFilter)).setHours(23, 59, 59, 999))
        )
      });
    } else if (startDateFilter) {
      whereConditions.push({
        created_at: MoreThanOrEqual(new Date(convertToISODate(startDateFilter)))
      });
    } else if (endDateFilter) {
      whereConditions.push({
        created_at: LessThanOrEqual(
          new Date(new Date(convertToISODate(endDateFilter)).setHours(23, 59, 59, 999))
        )
      });
    }

    // Agregar filtro de ID si se proporciona
    if (idFilter) {
      whereConditions.push({ id: idFilter });
    }

    const [clientes, total] = await ClienteRepository.findAndCount({
      where: whereConditions,
      skip: startIndex,
      take: limit
    });

    res.status(200).json({ data: clientes, total });

  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

/**
 * Obtiene un cliente por su ID.
 *
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

    // Búsqueda del cliente
    const cliente = await ClienteRepository.findOne({
      where: { id: req.params.id }
    });

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
 *
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

    // Validación de campos a actualizar
    if (!nombreCliente && !tipoIdentificacion && !numeroIdentificacion && !observaciones) {
      res.status(400).json({ message: "Falta el cuerpo de la petición" });
      return;
    }

    if (nombreCliente && nombreCliente.length > 100) {
      res.status(400).json({ message: "El nombre del cliente es muy largo" });
      return;
    }

    if (tipoIdentificacion && tipoIdentificacion.length > 100) {
      res.status(400).json({ message: "El tipo de identificación es muy largo" });
      return;
    }

    if (numeroIdentificacion && numeroIdentificacion.length > 100) {
      res.status(400).json({ message: "El número de identificación es muy largo" });
      return;
    }

    if (observaciones && observaciones.length > 1000) {
      res.status(400).json({ message: "Las observaciones son muy largas" });
      return;
    }

    // Búsqueda del cliente
    const cliente = await ClienteRepository.findOne({
      where: { id }
    });

    if (!cliente) {
      res.status(404).json({ message: "Cliente no encontrado" });
      return;
    }

    // Actualización del cliente
    cliente.nombreCliente = nombreCliente;
    cliente.tipoIdentificacion = tipoIdentificacion;
    cliente.numeroIdentificacion = numeroIdentificacion;
    cliente.observaciones = observaciones;

    await ClienteRepository.save(cliente);

    res.status(200).json(cliente);
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Elimina un cliente por su ID.
 *
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

    // Búsqueda del cliente
    const cliente = await ClienteRepository.findOne({
      where: { id }
    });

    if (!cliente) {
      res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Eliminación del cliente
    await ClienteRepository.delete(id);

    res.status(200).json({ message: "Cliente eliminado" });
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export { createCliente, getClientes, getCliente, updateCliente, deleteCliente, getClientesPaginacion };
