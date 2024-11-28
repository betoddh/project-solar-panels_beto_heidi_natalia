import React, { useState } from "react";  // Importamos React y el hook useState
import { Modal, Button } from "react-bootstrap";  // Importamos componentes de Bootstrap (Modal y Button)

const panelTypes = [
  // Definimos un arreglo de objetos con los tipos de paneles solares
  {
    type: "Monocrystalline",  // Tipo de panel
    description: "High efficiency and sleek design. Ideal for limited spaces.",  // Descripción
    image: "/cristalino.jpg",  // Imagen asociada al tipo de panel
    recommendedFor: "Residential areas with limited roof space.",  // Recomendado para...
  },
  {
    type: "Polycrystalline",
    description: "Moderate efficiency and affordable. Best for large setups.",
    image: "/poly.webp",
    recommendedFor: "Commercial and large residential installations.",
  },
  {
    type: "Thin Film",
    description: "Lightweight and flexible, suitable for unconventional setups.",
    image: "/OIP.jpg",
    recommendedFor: "Portable or off-grid solutions.",
  },
];

const PanelTypesSection = () => {
  // Definimos los estados para controlar la visibilidad del modal y el panel seleccionado
  const [show, setShow] = useState(false);  // Estado que controla la visibilidad del modal
  const [selectedPanel, setSelectedPanel] = useState(null);  // Estado que almacena el panel seleccionado

  // Función para mostrar el modal y asignar el panel seleccionado
  const handleShow = (panel) => {
    setSelectedPanel(panel);  // Asigna el panel seleccionado
    setShow(true);  // Muestra el modal
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setShow(false);  // Oculta el modal
    setSelectedPanel(null);  // Limpia el panel seleccionado
  };

  return (
    <div id="panel-types" className="container my-5">
      <h2 className="text-center mb-4">Types of Solar Panels</h2>  {/* Título de la sección */}
      <div className="row">
        {/* Mapeamos el arreglo 'panelTypes' y generamos una tarjeta para cada tipo de panel */}
        {panelTypes.map((panel, index) => (
          <div key={index} className="col-md-4">
            <div className="card shadow-sm">
              {/* Imagen del panel */}
              <img
                src={panel.image}
                className="card-img-top"
                alt={panel.type}
                style={{ height: "200px", objectFit: "cover" }}  // Estilo para la imagen
              />
              <div className="card-body">
                {/* Título y descripción del panel */}
                <h5 className="card-title">{panel.type}</h5>
                <p className="card-text">{panel.description}</p>
                {/* Botón para aprender más que abre el modal */}
                <Button variant="primary" onClick={() => handleShow(panel)}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal que muestra información detallada sobre el panel seleccionado */}
      <Modal show={show} onHide={handleClose} centered>
        {selectedPanel && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedPanel.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{selectedPanel.description}</p>  {/* Descripción detallada */}
              <p><strong>Recommended for:</strong> {selectedPanel.recommendedFor}</p>  {/* Recomendaciones */}
            </Modal.Body>
            <Modal.Footer>
              {/* Botón para cerrar el modal */}
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default PanelTypesSection;
