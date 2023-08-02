import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TablaMaterias from './TablaMaterias';

const App = () => {
  const [datosMaterias, setDatosMaterias] = useState([]);
  const [cargando, setCargando] = useState(true); // Inicialmente, establecemos "cargando" en true

  useEffect(() => {
    // Función para obtener los datos de materias desde el backend
    const cargarDatos = async () => {
      try {
        const response = await axios.get('/api/materias');
        setDatosMaterias(response.data);
        setCargando(false); // Una vez que los datos se han cargado, establecemos "cargando" en false
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setCargando(false); // En caso de error, también establecemos "cargando" en false
      }
    };

    cargarDatos();
  }, []);

  return (
    <div>
      <h1>Administracion Docente</h1>

      {cargando ? (
        <p>Espera, cargando datos...</p>
      ) : (
        <TablaMaterias datosMaterias={datosMaterias} />
      )}
    </div>
  );
};

export default App;
