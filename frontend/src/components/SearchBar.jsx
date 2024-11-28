// Importación de React para crear el componente
import React from "react";

// Componente SearchBar: una barra de búsqueda simple
const SearchBar = () => (
  // Contenedor principal con margen superior
  <div className="container mt-3">
    {/* Input de tipo texto para realizar la búsqueda */}
    <input
      type="text"  // Define que el campo es de tipo texto
      className="form-control"  // Clases de Bootstrap para estilizar el campo como un formulario
      placeholder="Search for information..."  // Texto que aparece como sugerencia cuando el campo está vacío
    />
  </div>
);

// Exportación del componente para que sea utilizado en otros archivos
export default SearchBar;
