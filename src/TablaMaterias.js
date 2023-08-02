import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TablaMaterias.css';
import { FaTrash } from 'react-icons/fa';

const TablaDocentes = () => {
  const [showMaterias, setShowMaterias] = useState(true);
  const [datosMaterias, setDatosMaterias] = useState([]);
  const [datosDocentes, setDatosDocentes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const rowsPerPage = 10;

  useEffect(() => {
    // Función para obtener los datos de materias desde el backend
    const obtenerDatosMaterias = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/materias');
        setDatosMaterias(response.data);
      } catch (error) {
        console.error('Error al obtener datos de materias:', error);
      }
    };

    // Función para obtener los datos de docentes desde el backend
    const obtenerDatosDocentes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/docentes');
        setDatosDocentes(response.data);
      } catch (error) {
        console.error('Error al obtener datos de docentes:', error);
      }
    };

    obtenerDatosMaterias();
    obtenerDatosDocentes();
  }, []);

  // Filtrar los datos de materias según el término de búsqueda
  const filteredMaterias = datosMaterias.filter((materia) =>
    materia.NombreMateria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrar los datos de docentes según el término de búsqueda
  const filteredDocentes = datosDocentes.filter((docente) =>
    docente.nombre1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    docente.nombre2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    docente.apellido1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    docente.apellido2?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener las filas que corresponden a la página actual
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = showMaterias ? filteredMaterias.slice(indexOfFirstRow, indexOfLastRow) : filteredDocentes.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleToggleTable = () => {
    setShowMaterias((prevState) => !prevState);
  };

  // Función para eliminar una fila por su ID
  const handleDeleteRow = async (id) => {
    try {
      // Realizar la solicitud de eliminación al backend
      await axios.delete(`http://localhost:4000/api/docentes/${id}`);
      // Actualizar los datos de docentes para reflejar la eliminación
      setDatosDocentes((prevData) => prevData.filter((docente) => docente.id !== id));
    } catch (error) {
      console.error('Error al eliminar el docente:', error);
    }
  };
  const handleDeleteMateria = async (id) => {
    try {
      // Realizar la solicitud de eliminación al backend
      await axios.delete(`http://localhost:4000/api/materias/${id}`);
      // Actualizar los datos de materias para reflejar la eliminación
      setDatosMaterias((prevData) => prevData.filter((materia) => materia.id !== id));
    } catch (error) {
      console.error('Error al eliminar la materia:', error);
    }
  };
  return (
    <div>
      <div className="button-container">
        <div className="toggle-table">
          <div className="botondm">
            <button onClick={handleToggleTable}>
              {showMaterias ? "Mostrar Materias" : "Mostrar Docentes"}
            </button>
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder={showMaterias ? "Buscar por nombre de materia" : "Buscar por nombre de docente"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>{showMaterias ? "NombreMateria" : "Número de Empleado"}</th>
            <th>{showMaterias ? "Cuatrimestre" : "Nombre"}</th>
            <th>{showMaterias ? "Carrera" : "Apellido"}</th>
            <th>{showMaterias ? "HoraFrenteGrupo" : "Título Académico"}</th>
            <th>{showMaterias ? "Asesorias" : "Carrera"}</th>
            <th>{showMaterias ? "Nivel" : "Teléfono"}</th>
            {!showMaterias && <th>Correo electrónico</th>}
            {!showMaterias && <th>Descripción</th>}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item, index) => (
            <tr
              key={item.id}
              onMouseEnter={() => setSelectedRowIndex(indexOfFirstRow + index)}
              onMouseLeave={() => setSelectedRowIndex(-1)}
              className={selectedRowIndex === indexOfFirstRow + index ? 'selected-row' : ''}
            >
              <td>{item.id}</td>
              {showMaterias ? (
                <>
                  <td>{item.NombreMateria}</td>
                  <td>{item.Cuatrimestre}</td>
                  <td>{item.Carrera}</td>
                  <td>{item.HoraFrenteGrupo}</td>
                  <td>{item.Asesorias}</td>
                  <td>{item.Nivel}</td>
                  <button
                      className="delete-button"
                      onClick={() => handleDeleteMateria(item.id)}
                    >
                      <FaTrash />
                    </button>
                </>
              ) : (
                <>
                  <td>{item.numero_empleado}</td>
                  <td>{`${item.nombre1} ${item.nombre2 ? item.nombre2 : ''}`}</td>
                  <td>{`${item.apellido1} ${item.apellido2 ? item.apellido2 : ''}`}</td>
                  <td>{item.titulo_academico}</td>
                  <td>{item.carrera}</td>
                  <td>{item.telefono}</td>
                  {!showMaterias && <td>{item.correo_electronico}</td>}
                  {!showMaterias && <td>{item.descripcion}</td>}
                  <td>
                    {/* Botón para eliminar */}
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteRow(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </>
              )}
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

export default TablaDocentes;
