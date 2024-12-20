# Aplicación para preinscripción de alumnos en línea.

## Pasos para bajar el código con git y establecer conexión a la db.
1. Instalar git <https://git-scm.com/downloads/win>
2. Abrir la terminal o la línea de comandos.
3. En la terminal ir o crear una carpeta para descargar el código.
4. Ejecutar el siguiente comando: `git clone https://github.com/isaac-chido-one/idaw-preinscripcion-alumnos.git`
5. Ir a la carpeta creada idaw-preinscripcion-alumnos: `cd idaw-preinscripcion-alumnos`
6. Copiar el erchivo .example.env a un nuevo archivo llamado .env: en posix `cp .example.env .env` o en windows `copy .example.env .env`
7. En ambiente de producción, editar el archivo .env para asignar a la variable `MONGODB_URI` la cadena de conexión a la base de datos.

## Pasos para levantar el servicio con node local
1. Instalar node, de preferencia la versión 20.11.1: <https://nodejs.org/en/download/prebuilt-installer>
2. Probar que node esté instalado correctamente ejecutando en la terminal: `node -v`
3. Probar que npm funcione correctamente ejecutando en la terminal: `npm -v`
4. Instalar paquetes de node con comando: `npm install`
5. En la terminal, en la carpeta idaw-preinscripcion-alumnos ejecutar el siguiente comando para levantar el servicio: `node src/index.js`
6. En el navegador abrir la URl <http://localhost:9080/>
7. Presionar Ctrl + C para detener el servicio.

## Pasos para levantar el servicio con docker
1. Instalar docker <https://www.docker.com/>
2. En linux dar permisos de escritura a carpeta data/configdb: `chmod -R 0777 data/configdb`
3. En linux dar permisos de escritura a carpeta data/db: `chmod -R 0777 data/db`
4. En la terminal, en la carpeta idaw-preinscripcion-alumnos ejecutar el siguiente comando sólo la primera vez para construir el contenedor: `docker-compose up -d --build`
5. Para ejecutar el contenedor el comando: `docker-compose up -d`
6. Ingresar al contenedor con el comando: `docker exec -it idaw-node bash`
7. Instalar paquetes de node con comando: `npm install`
8. Levantar el servicio con el comando: `npm run server`
9. En el navegador abrir la URl <http://localhost:9080/>
10. Presionar Ctrl + C para detener el servicio.
11. Comando para salir del contenedor: `exit`
12. Para detener el contenedor el comando: `docker-compose down -v`

URL del código fuente: <https://github.com/isaac-chido-one/idaw-preinscripcion-alumnos><br>
Compilar assets: `npm run build`<br>
Levantar servicio para desarrollo `npm run server`

***

# Nombre del Proyecto: Aplicación para preinscripción de alumnos en línea.

Objetivo general del proyecto: Ofrecer a los alumnos de Ingeniería de Software la posibilidad de proporcionar sus datos en línea y comprobante de pago de ingreso para evitar filas en ese proceso especifico.

Formulario para preinscripción:

* Solicitar primer apellido, segundo apellido y nombres (un input para cada uno)
* Solicitar sexo, fecha y entidad de nacimiento
* Generar CURP y presentarla (Primeros 13 caracteres mínimo, investigar algoritmo en javascript para generarla)
* Solicitar a través de un input tipo “file” la imagen o comprobante del pago al banco.
* Botones para guardar información o limpiar los campos

Pantalla para verificación de pago de alumnos:

* Solicitar CURP
* Presentar datos del alumno (nombre completo, sexo, fecha de nacimiento y entidad)
* Presentar imagen de comprobante de pago
* Casilla de verificación para que el operador valide el pago
* Botón de guardar (básicamente se guardara el estatus de que el alumno ya pagó)

Lista de alumnos con estatus de pago pagado

* Generar una tabla en pantalla de los alumnos con los siguientes datos
* Curp, Nombre completo, Estatus de pago

## Este proyecto será permitido a un sólo equipo
