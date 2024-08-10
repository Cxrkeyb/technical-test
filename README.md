# Monorepo

Este monorepo contiene tanto el frontend como el backend de la aplicación. Cada parte del proyecto tiene su propio directorio con instrucciones específicas.

## Estructura del Proyecto

- `frontend/`: Contiene el código del frontend.
- `backend/`: Contiene el código del backend.

## Instrucciones Generales

1. Clona el repositorio:
    ```bash
    git clone <URL-del-repositorio>
    ```

2. Accede al directorio `frontend` para trabajar con el frontend:
    ```bash
    cd frontend
    ```

3. Accede al directorio `backend` para trabajar con el backend:
    ```bash
    cd backend
    ```

Cada carpeta tiene un `README.md` específico con instrucciones detalladas para configurar y ejecutar el proyecto.

## Frontend

El frontend está construido con Next.js y utiliza TailwindCSS para el diseño.

### Tecnologías

- Next.js
- TailwindCSS
- JavaScript
- HTML
- CSS

### Requisitos

- Node.js (https://nodejs.org/en)
- npm (https://www.npmjs.com/)
- Git (https://git-scm.com/)
- Editor de código (por ejemplo, VSCode)
- Navegador web

### Instalación

1. Entra en el directorio `frontend`:
    ```bash
    cd frontend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Configura las variables de entorno creando un archivo `.env` en el directorio raíz del proyecto y añadiendo las variables necesarias. Puedes usar el archivo de ejemplo `.env.example` como referencia.

4. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

5. Abre tu navegador y navega a `http://localhost:3000`.

6. ¡Disfruta!

### Scripts

- `npm run dev`: Inicia el servidor en modo de desarrollo.

## Backend

El backend se ejecuta en un entorno Docker y utiliza TypeORM para la gestión de la base de datos.

### Requisitos

- Docker (https://www.docker.com/products/docker-desktop/)
- Node.js (https://nodejs.org/en)
- npm

### Instalación

1. Entra en el directorio `backend`:
    ```bash
    cd backend
    ```

2. Ejecuta `npm install` para instalar las dependencias del proyecto.
3. Configura las variables de entorno necesarias en un archivo `.env`. Puedes encontrar el archivo de ejemplo en el root del proyecto como `.env.example`.

### Ejecución

1. Ejecuta `docker-compose up -d` para iniciar los servicios de Docker.
2. Ejecuta `npm run run-migrations` para ejecutar las migraciones de la base de datos.

### Scripts

- `npm run dev`: Inicia el servidor en modo de desarrollo.
- `npm run build`: Compila el proyecto a JavaScript.
- `npm run typeorm`: Ejecuta el CLI de TypeORM.
- `npm run run-migrations`: Ejecuta las migraciones de la base de datos.
- `npm run gen-migration`: Genera una nueva migración.
- `npm run revert-migrations`: Revierte las migraciones de la base de datos.