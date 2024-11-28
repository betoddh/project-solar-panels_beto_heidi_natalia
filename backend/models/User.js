// Importa el módulo mongoose para interactuar con MongoDB
const mongoose = require("mongoose");

// Define el esquema para los usuarios
const userSchema = new mongoose.Schema({
  // Campo para el nombre de usuario
  username: {
    type: String, // El nombre de usuario debe ser de tipo String
    required: true, // Es obligatorio que este campo tenga un valor
    unique: true, // El valor debe ser único (no puede repetirse en la base de datos)
  },
  // Campo para la contraseña
  password: {
    type: String, // La contraseña debe ser de tipo String
    required: true, // Es obligatorio que este campo tenga un valor
  },
});

// Crea el modelo de usuario basado en el esquema definido
const User = mongoose.model("User", userSchema);

// Exporta el modelo para que pueda ser usado en otras partes del proyecto
module.exports = User;
