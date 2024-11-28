// Importación de módulos necesarios
const express = require("express"); // Framework para crear un servidor web
const mongoose = require("mongoose"); // ORM para interactuar con MongoDB
const path = require("path"); // Módulo para manejar rutas de archivos
const dotenv = require("dotenv"); // Carga variables de entorno desde un archivo .env

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express(); // Inicializa la aplicación Express

app.use(express.json()); // Middleware para interpretar solicitudes con JSON en el cuerpo

// Conexión a la base de datos MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Usa el nuevo parser de URL para MongoDB
    useUnifiedTopology: true, // Utiliza el nuevo motor de administración de conexiones
  })
  .then(() => console.log("Conectado a MongoDB")) // Mensaje de éxito
  .catch((error) => console.log("Error al conectar a MongoDB:", error)); // Manejo de errores

// Configuración para producción
if (process.env.NODE_ENV === 'production') {
  // Sirve los archivos estáticos de la carpeta 'frontend/build'
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  // Maneja cualquier solicitud que no coincida con una ruta del backend
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
} else {
  // Respuesta para entornos de desarrollo
  app.get("/", (req, res) => {
    res.send("¡Servidor backend funcionando!");
  });
}

// Inicia el servidor en el puerto definido en las variables de entorno o en el puerto 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
