import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TablaMaterias.css'; // Importa el archivo CSS

const TablaMaterias = () => {
  const [datosMaterias, setDatosMaterias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 10;

  useEffect(() => {
    // Función para obtener los datos de materias desde el backend
    const obtenerDatosMaterias = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/docentes');
        setDatosMaterias(response.data);
      } catch (error) {
        console.error('Error al obtener datos de materias:', error);
      }
    };

    obtenerDatosMaterias();
  }, []);

  // Filtrar los datos según el término de búsqueda
  const filteredMaterias = datosMaterias.filter((materia) =>
    materia.NombreMateria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener las filas que corresponden a la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredMaterias.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por nombre de materia"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>NombreMateria</th>
            <th>Cuatrimestre</th>
            <th>Carrera</th>
            <th>HoraFrenteGrupo</th>
            <th>Asesorias</th>
            <th>Nivel</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((materia) => (
            <tr key={materia.id}>
              <td>{materia.id}</td>
              <td>{materia.NombreMateria}</td>
              <td>{materia.Cuatrimestre}</td>
              <td>{materia.Carrera}</td>
              <td>{materia.HoraFrenteGrupo}</td>
              <td>{materia.Asesorias}</td>
              <td>{materia.Nivel}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentRows.length < rowsPerPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TablaMaterias;
