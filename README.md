#### Dependences
- **```express```**: El framework principal para crear el servidor.
- **```cors```**: Permite que el frontend se comunique con el backend.
- **```dotenv```**: Maneja variables de entorno de forma segura.
- **```mysql2```**: El cliente de MySQL para conectarnos a la base de datos.

#### Structure Backend
- ##### src/
>**```controllers```**: Aqui van los archivos que contienen la logica para manejar solicitudes (request) y enviar las respuestas (response).
>
>**```models```**: En esta carpeta se define como interactuar con la base de dartos (queries, tablas, etc.).
>
>**```routes```**: Contiene los archivos que definen las URL de nuestra API (ej. ```/products```, ```/invoices```).