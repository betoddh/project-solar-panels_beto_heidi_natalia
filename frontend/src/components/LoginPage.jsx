import React, { useState, useContext } from "react";  // Importamos React y los hooks useState y useContext
import { AuthContext } from "../context/AuthContext";  // Importamos el contexto de autenticación
import { useNavigate } from "react-router-dom";  // Importamos el hook useNavigate para la navegación

const LoginPage = () => {
  // Definimos los estados para manejar el formulario y el estado de error
  const { login, register } = useContext(AuthContext);  // Extraemos las funciones login y register del contexto
  const [isSignUp, setIsSignUp] = useState(false);  // Estado que controla si estamos en la vista de registro o inicio de sesión
  const [username, setUsername] = useState("");  // Estado que almacena el nombre de usuario
  const [password, setPassword] = useState("");  // Estado que almacena la contraseña
  const [errorMessage, setErrorMessage] = useState("");  // Estado que almacena el mensaje de error, si lo hay
  const navigate = useNavigate();  // Hook para redirigir a otra página

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevenimos el comportamiento predeterminado del formulario

    // Validamos que el nombre de usuario y la contraseña no estén vacíos
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Username and password are required");
      return;
    }

    // Si estamos en la vista de registro, intentamos registrar al usuario
    if (isSignUp) {
      const success = register(username, password);  // Llamamos a la función register
      if (success) {
        navigate("/");  // Si el registro fue exitoso, redirigimos a la página principal
      } else {
        setErrorMessage("Username already exists!");  // Si el nombre de usuario ya existe, mostramos un error
      }
    } else {
      // Si estamos en la vista de inicio de sesión, intentamos iniciar sesión
      const success = login(username, password);  // Llamamos a la función login
      if (success) {
        navigate("/");  // Si el inicio de sesión fue exitoso, redirigimos a la página principal
      } else {
        setErrorMessage("Invalid credentials");  // Si las credenciales son incorrectas, mostramos un error
      }
    }
  };

  return (
    <div>
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>  {/* El título cambia según el estado (registro o inicio de sesión) */}
      <form onSubmit={handleSubmit}>
        {/* Campo para ingresar el nombre de usuario */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}  // Actualiza el estado del nombre de usuario
            required
          />
        </div>
        {/* Campo para ingresar la contraseña */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Actualiza el estado de la contraseña
            required
          />
        </div>
        {/* Botón de envío que cambia según el estado */}
        <button type="submit" className="btn btn-primary">
          {isSignUp ? "Register" : "Login"}
        </button>
      </form>
      {/* Si hay un mensaje de error, lo mostramos */}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      <p>
        {/* Enlaces para alternar entre registro e inicio de sesión */}
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <button className="btn btn-link" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;