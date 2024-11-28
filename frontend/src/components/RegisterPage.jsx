// Importación de React, hooks necesarios y la librería axios para realizar solicitudes HTTP
import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  // Estados locales para almacenar los valores de los campos del formulario y los posibles errores
  const [username, setUsername] = useState("");  // Almacena el nombre de usuario
  const [password, setPassword] = useState("");  // Almacena la contraseña
  const [error, setError] = useState("");       // Almacena el mensaje de error si ocurre uno

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();  // Previene el comportamiento por defecto de recargar la página al enviar el formulario
    
    // Realiza una solicitud POST a la API para registrar un nuevo usuario
    axios
      .post("http://localhost:5000/api/register", { username, password })  // Se envían el username y password al backend
      .then((response) => {
        alert("User registered successfully");  // Si la solicitud es exitosa, muestra una alerta
      })
      .catch((err) => setError(err.response.data.message));  // Si ocurre un error, se muestra el mensaje de error
  };

  return (
    <div>
      <h2>Register</h2>  {/* Título de la página de registro */}
      
      {/* Si hay un mensaje de error, se muestra en color rojo */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Formulario de registro */}
      <form onSubmit={handleSubmit}>
        {/* Campo para ingresar el nombre de usuario */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Actualiza el estado de username al cambiar el valor del campo
        />
        
        {/* Campo para ingresar la contraseña */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Actualiza el estado de password al cambiar el valor del campo
        />
        
        {/* Botón para enviar el formulario */}
        <button type="submit">Register</button>
      </form>
      
      {/* Enlace para redirigir a la página de inicio de sesión si el usuario ya tiene una cuenta */}
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default RegisterPage;
