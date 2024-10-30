# Proyecto de Aplicación de Notas

Este proyecto consiste en una aplicación de notas desarrollada con un back-end utilizando el framework **NestJS** y un front-end configurado para interactuar con el back-end. El back-end se ejecuta en el puerto **3000**, mientras que el front-end opera en el puerto **3001** para evitar conflictos.

## Requisitos

Asegúrate de tener instalado Node.js en tu máquina. Puedes descargarlo desde [aquí](https://nodejs.org/).

## Configuración de CORS

Para asegurar una comunicación segura y controlada entre el front-end y el back-end, se ha configurado **CORS (Cross-Origin Resource Sharing)**, permitiendo únicamente las rutas específicas necesarias para la interacción entre los dos puertos.

## Pasos para la instalación y ejecución

### 1. Instalación de dependencias

1. Navega al directorio del proyecto del **back-end** y ejecuta:
   ```bash
   cd ruta/al/directorio/back-end
   npm install
