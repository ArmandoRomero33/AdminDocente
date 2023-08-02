const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 4000;

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost', // Cambia esto si tu base de datos no está en localhost
  user: 'root',
  password: '',
  database: 'docentesdb',
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos.');
  }
});

// Usar el middleware cors para permitir solicitudes desde todos los dominios
app.use(cors());

// Ruta para obtener los datos de materias desde la base de datos
app.get('/api/materias', (req, res) => {
  const query = 'SELECT * FROM materias'; // Consulta para obtener todos los datos de la tabla "materias"
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener datos de materias:', err);
      res.status(500).json({ error: 'Error al obtener datos de materias' });
    } else {
      res.json(result);
    }
  });
});

// Ruta para obtener los datos de docentes desde la base de datos
app.get('/api/docentes', (req, res) => {
  const query = 'SELECT * FROM docentes'; // Consulta para obtener todos los datos de la tabla "docentes"
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener datos de docentes:', err);
      res.status(500).json({ error: 'Error al obtener datos de docentes' });
    } else {
      res.json(result);
    }
  });
});

// Ruta para eliminar un docente por su ID
app.delete('/api/docentes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM docentes WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el docente:', err);
      res.status(500).json({ error: 'Error al eliminar el docente' });
    } else {
      res.json({ message: 'Docente eliminado exitosamente' });
    }
  });
});

// Ruta para eliminar una materia por su ID
app.delete('/api/materias/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM materias WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la materia:', err);
      res.status(500).json({ error: 'Error al eliminar la materia' });
    } else {
      res.json({ message: 'Materia eliminada exitosamente' });
    }
  });
});

// Resto de rutas y configuraciones...

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
