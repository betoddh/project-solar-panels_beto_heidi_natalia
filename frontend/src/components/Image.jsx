import React from "react";
import { Link } from "react-router-dom";

// Componente para mostrar una imagen de fondo con un mensaje central
const Image = () => {
  return (
    <div
      style={{
        // Estilo de fondo: imagen de fondo que cubre toda la altura de la ventana
        backgroundImage: "url('/2.webp')", // Ruta de la imagen
        height: "100vh", // Altura completa de la ventana
        backgroundSize: "cover", // La imagen cubrirá todo el contenedor
        backgroundPosition: "center", // Centrar la imagen
        display: "flex", // Usar flexbox para centrar el contenido
        flexDirection: "column", // Alinear elementos en una columna
        justifyContent: "center", // Centrar verticalmente
        alignItems: "center", // Centrar horizontalmente
        color: "white", // Color del texto blanco para visibilidad
        textAlign: "center", // Alinear el texto al centro
      }}
    >
      {/* Título principal */}
      <h1>Save for Solar</h1>
      {/* Descripción */}
      <p>Discover the benefits of solar energy and start saving today.</p>
      {/* Botón con enlace para aprender más */}
      <Link to="/learn-more" className="btn btn-primary mt-3">
        Learn More
      </Link>
    </div>
  );
};

export default Image;
