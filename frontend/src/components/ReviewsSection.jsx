// Importación de React y hooks necesarios
import React, { useState, useContext, useEffect } from "react";
// Importación del contexto de autenticación para acceder al usuario autenticado
import { AuthContext } from "../context/AuthContext";

const ReviewsSection = () => {
  // Obtener el usuario desde el contexto de autenticación
  const { user } = useContext(AuthContext);
  
  // Estado para almacenar las reseñas cargadas
  const [reviews, setReviews] = useState([]);
  
  // Estados para la nueva reseña y calificación
  const [newReview, setNewReview] = useState(""); // Contenido de la nueva reseña
  const [newRating, setNewRating] = useState(5);  // Calificación predeterminada de 5 estrellas

  // Hook useEffect para cargar las reseñas almacenadas en localStorage cuando el componente se monta
  useEffect(() => {
    const savedReviews = localStorage.getItem("reviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));  // Convertir las reseñas guardadas a un arreglo y establecerlas en el estado
    }
  }, []);  // El array vacío asegura que este efecto solo se ejecute una vez al cargar el componente

  // Función para agregar una nueva reseña
  const handleAddReview = () => {
    if (newReview.trim()) {
      // Crear un objeto para la nueva reseña, con el nombre de usuario o "Anonymous" si no está autenticado
      const newReviewData = {
        username: user?.username || "Anonymous",
        review: newReview,
        rating: newRating,
        date: new Date().toISOString(), // Fecha de la reseña en formato ISO
      };

      // Actualizar el estado con la nueva reseña
      const updatedReviews = [...reviews, newReviewData];
      setReviews(updatedReviews);
      
      // Guardar las reseñas actualizadas en localStorage
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));

      // Limpiar los campos de la nueva reseña
      setNewReview("");
      setNewRating(5);
    }
  };

  return (
    <div id="reviews" className="container my-5">
      <h2>User Reviews</h2>
      <ul className="list-group mb-4">
        {reviews.map((review, index) => (
          <li key={index} className="list-group-item">
            {/* Mostrar el nombre del usuario, la calificación y la fecha */}
            <strong>{review.username}</strong> ({review.rating}★) -{" "}
            <span>{new Date(review.date).toLocaleString()}</span>
            {/* Mostrar el contenido de la reseña */}
            <p>{review.review}</p>
          </li>
        ))}
      </ul>

      {/* Si el usuario no está autenticado, mostrar un mensaje */}
      {!user ? (
        <div className="alert alert-warning">
          You must be logged in to submit a review.
        </div>
      ) : (
        // Si el usuario está autenticado, mostrar el formulario para agregar una reseña
        <>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Write your review"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}  // Actualizar el estado con el contenido del campo de texto
            ></textarea>
          </div>
          <div className="mb-3">
            <label>Rating:</label>
            <select
              className="form-select"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}  // Actualizar la calificación seleccionada
            >
              <option value={5}>5★</option>
              <option value={4}>4★</option>
              <option value={3}>3★</option>
              <option value={2}>2★</option>
              <option value={1}>1★</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleAddReview}>
            Submit Review
          </button>
        </>
      )}
    </div>
  );
};

// Exportación del componente para ser utilizado en otras partes de la aplicación
export default ReviewsSection;