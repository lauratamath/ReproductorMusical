# ReproductorMusical

## PARA INSTALAR LAS LIBRERÍAS
Primero deberás instalar node.js
https://nodejs.org/es/download/ ( <-- Puedes descargarlo en este link)
______________________________________________________________________________
# Una vez instalado node.js...
Ingresa a la carpeta donde se ubica el proyecto (ya sea utilizando el cmd o el shell).
Una vez dentro, ejecuta el siguiente comando:

# Librería Express
```
npm i express pg
```
**Esto deberá de iniciar el proceso de descarga automática, posteriormente te generará la carpeta node-postgres**

## NOTA*
En ciertos casos deberás de seguir lo siguiente:
A la carpeta *node-postgres* copiar el contenido de la carpeta **Copiar a node**  
Dar aceptar si pregunta "reemplazar archivos"
______________________________________________________________________________
# Librería React
Para obtener las librerías de react, ejecuta el siguiente comando: 
```
npx create-react-app react-postgres
```
**Esto generará la carpeta react-postgres**

Deberás de ingresar a la nueva carpeta (react-postgres), donde ejecutarás el siguiente comando:
```
npm install react-router-dom
```
**Esto les generará las carpetas react-router-dom y react-router dentro de node_modules**

## NOTA*
En ciertos casos deberás de seguir lo siguiente:
A la carpeta *react-postgres* copiar el contenido de la carpeta **Copiar a react**  
Dar aceptar si pregunta "reemplazar archivos"
______________________________________________________________________________  
##  PARA COPIAR LA BASE DE DATOS

Ejecuta el archivo "proyecto.sql" en pgAdmin.
**Cuentas predeterminadas y sus accesos**
- Sergio.M sergio.55@hotmail.com Kript0Curr3ncy **ADMIN**
- Olivverde oliver.milian00@gmail.com M@sterKey12 **FREE**
- aamaya aamalin.amaya@gmail.com Carlos12321 **PREMIUM**
- LauraTam lauratamath@gmail.com XoxoTKM@35 **CREATOR**

##  PARA CORRER
Crear una database "proyecto" en postgres, ejecuta el archivo **proyecto.sql**
**IMPORTANTE**
En node-postgres/music_model cambiar la contraseña en la línea 6 por la que tengas en pgadmin4.  

______________________________________________________________________________  
##  EJECUCIÓN
Para activar la base de datos, abre una consola en la carpeta **node-postgres** y ejecuta el siguiente comando:
```
node index.js
```
Si la operación es exitosa, visualizarás el siguiente mensaje: App running on port 3001.
______________________________________________________________________________
**IMPORTANTE**
En react-postgres/src/memberships/functions/Searchbar.js cambiar en la línea 106 la constante token por el nuevo generado en: https://developer.spotify.com/console/get-album/  
En react-postgres/src/memberships/functions/SearchbarPremium.js cambiar en la línea 111 la constante token por el mismo generado anteriormente  
  
Para activar la app en react, abre otra consola en la carpeta **react-postgres/src** y ejecuta el siguiente comando:
```
npm start
```
Si la operación es exitosa, visualizarás el siguiente mensaje: Starting the development server...  
Y abrirá una pagina web  

##  IMPORTANTE QUE TENGAN DOS CONSOLAS PARA QUE CORRA BIEN
