import React, { useState } from "react";
import axios from "axios";

// Componente principal de la página
const LearnMorePage = () => {
  // Estados locales para manejar la latitud, longitud, datos del clima, y otros cálculos
  const [location, setLocation] = useState({ lat: "", lon: "" }); // Guardamos las coordenadas latitud y longitud
  const [weather, setWeather] = useState(null); // Guardamos los datos del clima
  const [loading, setLoading] = useState(false); // Indica si se está cargando la información
  const [error, setError] = useState(null); // Almacena errores en caso de que ocurran
  const [dinero, setDinero] = useState(""); // Monto disponible para invertir en paneles solares
  const [paneles, setPaneles] = useState(""); // Resultado del cálculo de paneles solares
  const [climaCalculado, setClimaCalculado] = useState(false); // Bandera que indica si el clima fue calculado correctamente

  // Clave API de OpenWeatherMap (deberías almacenarla en un archivo .env en un proyecto real)
  const API_KEY = "a1e499dae2e276e67f92c10856b18ac3"; 

  // Función asincrónica para obtener los datos del clima de la API
  const fetchWeatherData = async () => {
    // Verifica si la latitud y longitud son válidas
    if (!location.lat || !location.lon) {
      setError("Please enter valid latitude and longitude.");
      return;
    }

    // Inicia el estado de carga y resetea errores
    setLoading(true);
    setError(null);

    try {
      // Realiza una solicitud a la API de OpenWeatherMap para obtener el clima
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
      );
      // Actualiza el estado con los datos recibidos
      setWeather(response.data);
      setClimaCalculado(true); // Marca que el clima fue calculado
    } catch (err) {
      // Si ocurre un error, se actualiza el estado de error
      setError("Error fetching weather data. Please check your API key or network connection.");
    } finally {
      // Termina el estado de carga
      setLoading(false);
    }
  };

  // Función para calcular el número de paneles solares necesarios según el dinero disponible
  const calcularPaneles = () => {
    // Verifica que el clima haya sido calculado previamente
    if (!climaCalculado) {
      alert("You must calculate the weather first.");
      return;
    }

    // Convierte el valor de dinero a número y verifica si es válido
    let din = parseFloat(dinero); 
    if (isNaN(din) || din <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // Variable para acumular el valor en Wh (vatios-hora)
    let wh = 0;
    const dinorg = din;

    // Calcula los paneles solares basándose en el dinero disponible
    if (din >= 76.125) {
      din -= 76.125;
      wh += 75;
    } else {
      wh += Math.ceil(din / 1.015);
      din = 0;
    }
    if (din >= 81.25) {
      din -= 81.25;
      wh += 65;
    } else if (din > 0) {
      wh += Math.ceil(din / 1.25);
      din = 0;
    }
    if (din > 0) {
      wh += Math.ceil(din / 3.73);
    }

    // Ajusta la cantidad de Wh según la temperatura (si está fuera del rango ideal)
    const temp = weather.main.temp;
    if (temp < 25 || temp > 30) {
      wh = wh * 1.15; // Si la temperatura está fuera del rango, se aumenta el valor
    }

    // Calcula el número de paneles solares necesarios (1 panel = 50 Wh)
    const panelesCalculados = Math.ceil(wh / 50); 
    setPaneles(`You need at least ${panelesCalculados} solar panel(s).`);
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial" }}>
      <h2>Learn More About Solar Energy</h2>

      {/* Sección para ingresar las coordenadas y consultar el clima */}
      <div className="card shadow p-4">
        <h4>Check Weather</h4>
        <p>Enter latitude and longitude to get the weather data:</p>
        <div className="mb-3">
          <label className="form-label">Latitude:</label>
          <input
            type="number"
            className="form-control"
            value={location.lat}
            onChange={(e) => setLocation({ ...location, lat: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Longitude:</label>
          <input
            type="number"
            className="form-control"
            value={location.lon}
            onChange={(e) => setLocation({ ...location, lon: e.target.value })}
          />
        </div>
        <button onClick={fetchWeatherData} className="btn btn-primary">
          Check Weather
        </button>
        {loading && <p>Loading data...</p>} {/* Muestra mensaje de carga */}
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Muestra errores */}
        {weather && (
          <div style={{ marginTop: "20px" }}>
            <h5>Weather Results:</h5>
            <p>City: {weather.name}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Description: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
        )}
      </div>

      {/* Sección para ingresar dinero disponible y calcular paneles solares */}
      <div className="card shadow p-4 mt-4">
        <h4>Solar Panel Calculator</h4>
        <p>Enter available money (in your currency):</p>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={dinero}
            onChange={(e) => setDinero(e.target.value)}
          />
        </div>
        <button onClick={calcularPaneles} className="btn btn-success">
          Calculate Panels
        </button>

        {paneles && (
          <div style={{ marginTop: "20px" }}>
            <h5>Result:</h5>
            <p>{paneles}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnMorePage;