import { DataSource, DataSourceOptions } from "typeorm";
import config from "@/config";
import { models } from "./entities/";

const options: DataSourceOptions = {
  ...config.databases.mysql,
  synchronize: false,
  logging: false,
  dropSchema: false,
  type: "mysql",
  maxQueryExecutionTime: 1000,
  entities: models,
  migrations: config.env.isMigrationEnv
    ? ["src/databases/postgresql/migrations/*.ts"]
    : ["dist/databases/postgresql/migrations/*.js"],
  extra: {
    connectionLimit: 10
  },
  // @ts-expect-error Check types
  cli: {
    migrationsDir: "./src/databases/postgresql/migrations/"
  }
};

const source = new DataSource(options);
void source.initialize();

export default source;
