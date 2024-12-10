# Aplicación para preinscripción de alumnos en línea.

## Pasos para bajar el código con git
1. Instalar git [https://git-scm.com/downloads/win](URL)
2. Abrir la terminal o la línea de comandos.
3. En la terminal ir o crear una carpeta para descargar el código.
4. Ejecutar el siguiente comando: `git clone https://github.com/isaac-chido-one/idaw-preinscripcion-alumnos.git`
5. Ir a la carpeta creada idaw-preinscripcion-alumnos

## Pasos para bajar el código comprimido
1. Abrir la url [https://github.com/isaac-chido-one/idaw-preinscripcion-alumnos](URL)
2. Click en el botón verde Code.
3. Click en el panel inferior Download ZIP.

## Pasos para levantar el servicio con node local
1. Instalar node, de preferencia la versión 20.11.1: [https://nodejs.org/en/download/prebuilt-installer](URL)
2. Probar que node esté instalado correctamente ejecutando en la terminal: `node -v`
3. Probar que npm funcione correctamente ejecutando en la terminal: `npm -v`
4. Instalar paquetes de node con comando: `npm install`
5. En la terminal, en la carpeta idaw-preinscripcion-alumnos ejecutar el siguiente comando para levantar el servicio: `node src/index.js`
6. En el navegador abrir la URl [http://localhost:9080/](URL)
7. Presionar Ctrl + C para detener el servicio.

## Pasos para levantar el servicio con docker
1. Instalar docker [https://www.docker.com/](URL)
2. Dar permisos de escritura a carpeta data: `chmod -R 0777 data`
3. En la terminal, en la carpeta idaw-preinscripcion-alumnos ejecutar el siguiente comando sólo la primera vez para construir el contenedor: `docker-compose up -d --build`
4. Para ejecutar el contenedor el comando: `docker-compose up -d`
5. Ingresar al contenedor con el comando: `docker exec -it idaw-node bash`
6. Instalar paquetes de node con comando: `npm install`
7. Levantar el servicio con el comando: `node src/index.js`
8. En el navegador abrir la URl [http://localhost:9080/](URL)
9. Presionar Ctrl + C para detener el servicio.
10. Comando para salir del contenedor: `exit`
11. Para detener el contenedor el comando: `docker-compose down -v`

URL del código fuente: [https://github.com/isaac-chido-one/idaw-preinscripcion-alumnos](URL)<br>
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
* Botón de guardar (básicamente se guardara el estatus de que el alumno ya pago)

Lista de alumnos con estatus de pago pagado

* Generar una tabla en pantalla de los alumnos con los siguientes datos
* Curp, Nombre completo, Estatus de pago

## Este proyecto será permitido a un solo equipo
