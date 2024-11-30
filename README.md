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
6. En el navegador abrir la URl [http://localhost:8888/](URL)
7. Presionar Ctrl + C para detener el servicio.

## Pasos para levantar el servicio con docker
1. Instalar docker [https://www.docker.com/](URL)
2. En la terminal, en la carpeta idaw-preinscripcion-alumnos ejecutar el siguiente comando sólo la primera vez para construir el contenedor: `docker-compose up -d --build`
3. Para ejecutar el contenedor el comando: `docker-compose up -d`
4. Ingresar al contenedor con el comando: `docker exec -it idaw-node bash`
5. Instalar paquetes de node con comando: `npm install`
6. Levantar el servicio con el comando: `node src/index.js`
7. En el navegador abrir la URl [http://localhost:8888/](URL)
8. Presionar Ctrl + C para detener el servicio.
9. Comando para salir del contenedor: `exit`
10. Para detener el contenedor el comando: `docker-compose down -v`

URL del código fuente: [https://github.com/isaac-chido-one/idaw-preinscripcion-alumnos](URL)<br>
Compilar assets: `npx mix`
