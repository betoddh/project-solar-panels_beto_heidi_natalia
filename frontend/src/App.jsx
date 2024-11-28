// Importación de dependencias necesarias de React y React Router
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Importación de componentes y contexto para autenticación
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import Header from "./components/Header";
import Image from "./components/Image";
import InfoSection from "./components/InfoSection";
import PanelTypesSection from "./components/PanelTypesSection";
import ReviewsSection from "./components/ReviewsSection";
import LoginPage from "./components/LoginPage";
import Footer from "./components/Footer";
import LearnMorePage from "./components/LearnMorePage";

// Componente PrivateRoute para proteger rutas que requieren autenticación
const PrivateRoute = ({ children }) => {
  // Acceso al contexto de autenticación
  const { user } = useContext(AuthContext);
  
  // Si el usuario está autenticado, renderiza los niños (contenido protegido),
  // si no, redirige a la página de inicio de sesión
  return user ? children : <Navigate to="/login" />;
};

// Componente principal de la aplicación (App)
const App = () => {
  return (
    // Proveedor de contexto de autenticación, que encapsula toda la aplicación
    <AuthContextProvider>
      {/* Router de React que maneja la navegación entre las páginas */}
      <Router>
        {/* Componente de encabezado común para todas las páginas */}
        <Header />
        {/* Definición de las rutas de la aplicación */}
        <Routes>
          {/* Ruta principal ("/") */}
          <Route
            path="/"
            element={ // Elemento que se renderiza cuando se accede a la ruta principal
              <div>
                <Image />
                <InfoSection />
                <PanelTypesSection />
                <Footer />
              </div>
            }
          />
          {/* Ruta para la página de "Aprende más" */}
          <Route path="/learn-more" element={<LearnMorePage />} />
          {/* Ruta para la página de inicio de sesión */}
          <Route path="/login" element={<LoginPage />} />
          {/* Ruta para la página de reseñas, que está protegida por autenticación */}
          <Route
            path="/reviews"
            element={ // Aquí se utiliza el componente PrivateRoute para proteger la ruta
              <PrivateRoute>
                <ReviewsSection />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

// Exporta el componente principal para ser utilizado en otros archivos
export default App;