import "reflect-metadata";

import config from "./config/index";

import Database from "./databases/mysql";
import logger from "./logger";
import ws from "./web/index";

const { swaggerDocs: V1SwaggerDocs } = require("./services/swagger/swagger");

require("dotenv").config();

const Server = async () => {
  try {
    await Database();
    await ws.listen(config.web.port, () => {
      V1SwaggerDocs(ws, config.web.port);
    });
    void Promise.resolve();
  } catch (e) {
    void Promise.reject(e);
  }
};

Server()
  .then(() => {
    logger.info(`Backend service initialized in ${performance.now()} ms`);
    logger.info(`Web server started in http://localhost:${config.web.port}/`);
  })
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  });
