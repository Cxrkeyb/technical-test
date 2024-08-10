# Backend

Se ejecuta en un entorno Docker y utiliza TypeORM para la gestión de la base de datos.

## Requisitos

- Docker (https://www.docker.com/products/docker-desktop/)
- Node.js (https://nodejs.org/en)
- npm

## Instalación

1. Clona el repositorio de GitHub.
2. Ejecuta `npm install` para instalar las dependencias del proyecto.
3. Configura las variables de entorno necesarias en un archivo `.env`. Puedes encontrar el de prueba en el root del proyecto ".env.example".

## Ejecución

1. Ejecuta `docker-compose up -d` para iniciar los servicios de Docker.
2. Ejecuta `npm run run-migrations` para ejecutar las migraciones de la base de datos.

## Scripts

- `npm run dev`: Inicia el servidor en modo de desarrollo.
- `npm run build`: Compila el proyecto a JavaScript.
- `npm run typeorm`: Ejecuta el CLI de TypeORM.
- `npm run run-migrations`: Ejecuta las migraciones de la base de datos.
- `npm run gen-migration`: Genera una nueva migración.
- `npm run revert-migrations`: Revierte las migraciones de la base de datos.
