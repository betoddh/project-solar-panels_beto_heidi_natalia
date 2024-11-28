// Importa los módulos necesarios
const express = require("express"); // Framework para crear el servidor y manejar rutas
const bcrypt = require("bcrypt"); // Librería para encriptar contraseñas
const jwt = require("jsonwebtoken"); // Librería para generar y verificar tokens JWT
const User = require("./models/User"); // Modelo de usuario

const router = express.Router(); // Crea un enrutador para manejar rutas relacionadas con la autenticación

// Ruta para registro de usuario
router.post("/register", async (req, res) => {
  const { username, password } = req.body; // Obtiene los datos enviados en la solicitud

  // Verifica que ambos campos estén presentes
  if (!username || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  try {
    // Verifica si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    // Hashea la contraseña para almacenarla de forma segura
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario y lo guarda en la base de datos
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Responde con éxito al registrar al usuario
    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (err) {
    // Manejo de errores en el servidor
    res.status(500).json({ message: "Error al registrar el usuario." });
  }
});

// Ruta para login de usuario
router.post("/login", async (req, res) => {
  const { username, password } = req.body; // Obtiene los datos enviados en la solicitud

  // Verifica que ambos campos estén presentes
  if (!username || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos." });
  }

  try {
    // Busca al usuario en la base de datos
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Usuario o contraseña inválidos." });
    }

    // Compara la contraseña ingresada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Usuario o contraseña inválidos." });
    }

    // Genera un token JWT con un tiempo de expiración de 1 hora
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Responde con el token y los datos básicos del usuario
    res.status(200).json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    // Manejo de errores en el servidor
    res.status(500).json({ message: "Error al iniciar sesión." });
  }
});

module.exports = router; // Exporta el enrutador para usarlo en la aplicación principal
