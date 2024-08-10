import dotenv from "dotenv";

dotenv.config();

const config = {
  databases: {
    mysql: {
      host: process.env.DATABASE_HOST ?? "localhost",
      port: parseInt(process.env.DATABASE_PORT ?? "5432", 10),
      username: process.env.DATABASE_USERNAME ?? "backend",
      password: process.env.DATABASE_PASSWORD ?? "",
      database: process.env.DATABASE_NAME ?? "backend"
    }
  },
  web: {
    port: parseInt(process.env.WEB_SERVER_PORT!, 10),
    cookieSecret: process.env.COOKIE_SECRET,
    allowedHosts: ["localhost"],
    appName: process.env.APP_NAME ?? "Backend",
    appUrl: process.env.APP_URL ?? "http://localhost",
    cookieName: process.env.COOKIE_NAME ?? "x-access-token"
  },
  env: {
    isDevEnv: process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "migration",
    isMigrationEnv: process.env.MIGRATION_ENV === "true",
    isScriptEnv: process.env.NODE_ENV === "script",
    isProdEnv: process.env.NODE_ENV === "production"
  }
};

export default config;
