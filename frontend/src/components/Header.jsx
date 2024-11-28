import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Componente para la barra de navegación principal
const Header = () => {
  // Obtener datos del usuario y función de logout desde el contexto de autenticación
  const { user, logout } = useContext(AuthContext);

  // Estado para manejar la entrada de búsqueda
  const [searchQuery, setSearchQuery] = useState("");

  return (
    // Barra de navegación con diseño oscuro
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo y título de la marca */}
        <Link className="navbar-brand" to="/">
          <img
            src="/solar_panel_PNG117.png" // Ruta de la imagen del logo
            alt="Logo"
            style={{ width: "30px", marginRight: "10px" }} // Tamaño y margen del logo
          />
          Save for Solar
        </Link>

        {/* Botón para colapsar el menú en pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav" // ID del menú que se colapsará
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Links de navegación principales */}
          <ul className="navbar-nav ms-auto">
            {/* Enlaces a diferentes secciones de la página */}
            <li className="nav-item">
              <a className="nav-link" href="#info">
                Info
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#panel-types">
                Types
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reviews">
                Reviews
              </Link>
            </li>
          </ul>

          {/* Botón de autenticación (Login o Logout) */}
          <div className="ms-3 d-flex">
            {user ? (
              // Si el usuario está autenticado, mostrar el botón de logout
              <button className="btn btn-danger" onClick={logout}>
                Logout
              </button>
            ) : (
              // Si no hay usuario autenticado, mostrar el botón de login
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Barra de búsqueda */}
          <form className="d-flex ms-3">
            <input
              className="form-control" // Estilo del input
              type="text"
              placeholder="Search..." // Texto de marcador de posición
              value={searchQuery} // Valor del input controlado por el estado
              onChange={(e) => setSearchQuery(e.target.value)} // Actualizar el estado al cambiar el valor
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
