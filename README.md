# Aplicación de Notas

Este proyecto consiste en una aplicación de gestión de tareas, desarrollada con un **Back-End** utilizando **NestJS** y un **Front-End** que opera en **React**. Esta aplicación permite a los usuarios crear, editar y eliminar tareas de manera sencilla y eficiente.

## Descripción del Proyecto

- **Back-End**: Desarrollado con **NestJS**, configurado para ejecutarse en el puerto **3000**. Se encarga de manejar la lógica de negocio, la conexión a la base de datos y la autenticación de usuarios.
- **Front-End**: Implementado con **React**, se ejecuta en el puerto **3001** para evitar conflictos de puerto con el back-end. Se encarga de la interfaz de usuario y la interacción con el back-end a través de API.

### Seguridad y Comunicación

Para asegurar una comunicación segura y controlada entre el front-end y el back-end, se ha configurado **CORS (Cross-Origin Resource Sharing)**, permitiendo únicamente las rutas específicas necesarias para la interacción entre estos dos puertos.

## Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas en tu sistema:

- **Node.js** (versión 14 o superior)
- **npm** (viene con Node.js)
- **Git** (opcional, para clonar el repositorio)

## Instalación y Ejecución

### 1. Clonación del Repositorio

Si aún no has clonado el proyecto, ejecuta el siguiente comando en tu terminal:


git clone https://github.com/Jotas19/Aplicaci-n-de-Notas.git
2. Instalación de Dependencias
a. Back-End
Navega al directorio del proyecto del back-end:


cd Aplicación de Notas/back-end
Instala las dependencias necesarias:

npm install
b. Front-End
Navega al directorio del proyecto del front-end:

cd ../front-end
Instala las dependencias necesarias:

npm install
3. Ejecución de los Proyectos
a. Iniciar el Back-End
Navega de nuevo al directorio del back-end:

cd ../back-end
Inicia el servidor back-end ejecutando el siguiente comando:

npm run start
Esto iniciará el servidor en el puerto 3000.

b. Iniciar el Front-End
Navega al directorio del front-end:

cd ../front-end
Inicia el servidor front-end ejecutando el siguiente comando:

npm run start
Esto iniciará la aplicación en el puerto 3001.

4. Acceso a la Aplicación
Una vez que ambos servidores estén en ejecución, puedes acceder a la aplicación en tu navegador:

Back-End: http://localhost:3000
Front-End: http://localhost:3001
