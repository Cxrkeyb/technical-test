/* eslint-disable import/no-mutable-exports */

import { DataSource } from "typeorm";

import logger from "../../logger";
import DataSourceIns from "../../databases/mysql/config";

let connection: DataSource = DataSourceIns;

const Database = async (): Promise<DataSource> => {
  if (connection) return connection;

  connection = DataSourceIns;

  try {
    await connection.initialize();
    logger.info("MySQL Database connected");
  } catch (e) {
    logger.error("MySQL Database error", { error: e });
    throw new Error("MySQL Database error");
  }

  return connection;
};

export default Database;
export { connection };
