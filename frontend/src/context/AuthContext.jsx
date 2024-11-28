// Importación de React y hooks necesarios para gestionar el contexto y el estado
import React, { createContext, useState, useEffect } from 'react';

// Creación de un contexto de autenticación para compartir el estado del usuario en toda la aplicación
export const AuthContext = createContext();

// Componente proveedor del contexto de autenticación
const AuthContextProvider = ({ children }) => {
  // Estado para almacenar la información del usuario autenticado
  const [user, setUser] = useState(null);

  // Hook useEffect para verificar si hay un usuario guardado en localStorage al cargar el componente
  useEffect(() => {
    const fetchUser = async () => {
      // Obtener el usuario guardado en el almacenamiento local
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        // Si existe, convertirlo en un objeto y establecerlo en el estado
        setUser(JSON.parse(savedUser));
      }
    };
    fetchUser();
  }, []);  // El array vacío asegura que esto solo se ejecute una vez cuando el componente se monte

  // Función para registrar un nuevo usuario
  const register = (username, password, name) => {
    // Crear un nuevo objeto de usuario con los datos proporcionados
    const newUser = { username, password, name };  // Agregar nombre completo
    const users = JSON.parse(localStorage.getItem('users')) || []; // Obtener usuarios previos, si los hay
    
    // Verificar si el nombre de usuario ya está registrado
    if (users.find((user) => user.username === username)) {
      return false; // Si el usuario ya existe, retornar false
    }

    // Si no existe, agregar al nuevo usuario a la lista y guardarlo en localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Establecer el usuario en el estado y guardarlo en localStorage como usuario actual
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));

    return true;  // Retornar true si el registro fue exitoso
  };

  // Función para iniciar sesión de un usuario
  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []; // Obtener usuarios del localStorage
    // Buscar el usuario que coincida con el nombre de usuario y la contraseña
    const foundUser = users.find((user) => user.username === username && user.password === password);
    
    // Si el usuario es encontrado, establecer el usuario en el estado y en localStorage
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;  // Retornar true si el login es exitoso
    }
    return false; // Retornar false si no se encuentra el usuario
  };

  // Función para cerrar sesión de un usuario
  const logout = () => {
    setUser(null);  // Establecer el estado de usuario a null
    localStorage.removeItem('user');  // Eliminar al usuario del localStorage
  };

  // Retornar el contexto de autenticación con las funciones disponibles para el resto de la aplicación
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}  {/* Renderizar los componentes hijos envueltos en este proveedor */}
    </AuthContext.Provider>
  );
};

// Exportar el componente para que pueda ser utilizado en otros archivos
export default AuthContextProvider;