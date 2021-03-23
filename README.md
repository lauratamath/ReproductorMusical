# ReproductorMusical

## PARA INSTALAR LAS LIBRERÍAS
Primero tienen que tener node.js instalado
______________________________________________________________________________
Para la librería de express:  **Esto les generará la carpeta node-postgres**
```
npm i express pg
```
A la carpeta *node-postgres* copiar el contenido de la carpeta **Copiar a node**  
Dar aceptar si pregunta "reemplazar archivos"
______________________________________________________________________________
Para las librerías de react: **Esto les generará la carpeta react-postgres**
```
npx create-react-app react-postgres
```
En react-postgres/node_modules **Esto les generará las carpetas react-router-dom y react-router dentro de node_modules**
```
npm install react-router-dom
```
A la carpeta *react-postgres* copiar el contenido de la carpeta **Copiar a react**  
Dar aceptar si pregunta "reemplazar archivos"
______________________________________________________________________________  
##  PARA COPIAR LA BASE DE DATOS
Copiar el archivo proyecto.sql a pgAdmin para tener acceso a las cuentas predeterminadas
- Sergio.M sergio.55@hotmail.com Kript0Curr3ncy **ADMIN**
- Olivverde oliver.milian00@gmail.com M@sterKey12 **FREE**
- aamaya aamalin.amaya@gmail.com Carlos12321 **PREMIUM**
- LauraTam lauratamath@gmail.com XoxoTKM@35 **CREATOR**

##  PARA CORRER
Crear una database "proyecto" en postgres y copiar los queries del archivo **proyecto.sql**
En node-postgres/music_model cambiar la contraseña en la línea 6 por la que tengan en pgadmin4  
Para activar la base de datos: Abren una consola en la carpeta node-postgres  
```
node index.js
```
Les saldrá: App running on port 3001.
______________________________________________________________________________
En react-postgres/src/memberships/functions/Searchbar.js cambiar en la línea 106 la constante token por el nuevo generado en: https://developer.spotify.com/console/get-album/  
En react-postgres/src/memberships/functions/SearchbarPremium.js cambiar en la línea 111 la constante token por el mismo generado anteriormente  
  
Para activar la app en react: Abren otra consola en la carpeta: react-postgres/src  
```
npm start
```
Les saldrá: Starting the development server...  
Y les abrirá una pagina web  

##  IMPORTANTE QUE TENGAN DOS CONSOLAS PARA QUE CORRA BIEN
