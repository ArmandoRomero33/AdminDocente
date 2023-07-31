import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TablaMaterias from './TablaMaterias';

const App = () => {
  const [datosMaterias, setDatosMaterias] = useState([]);
  const [cargando, setCargando] = useState(false);

  const cargarDatos = () => {
    setCargando(true);
    // Llamada a la API para obtener los datos de materias desde el backend
    axios.get('/api/materias')
      .then((response) => {
        setDatosMaterias(response.data);
        setCargando(false);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
        setCargando(false);
      });
  };

  useEffect(() => {
    // Cargar los datos automáticamente al cargar la página (opcional)
    cargarDatos();
  }, []);

  return (
    <div>
      <h1>Administracion Docente</h1>
      <button onClick={cargarDatos} disabled={cargando}>
        {cargando ? 'Cargando...' : 'Cargar Datos'}
      </button>
      <br />
      {cargando ? (
        <p>Espera, cargando datos...</p>
      ) : (
        <TablaMaterias datosMaterias={datosMaterias} />
      )}
    </div>
  );
};

export default App;
