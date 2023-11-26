// components/ListaEstudiantes.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './ListaEstudiantes.css'; // Archivo de estilos CSS

// Datos de ejemplo de estudiantes
const estudiantesEjemplo = [
  { id: 1, nombres: 'Juan Carlos', rut: '12345678-9', apellidos: 'Pérez González' },
  { id: 2, nombres: 'María Alejandra', rut: '98765432-1', apellidos: 'Gómez Smith' },
  { id: 3, nombres: 'Pedro Andrés', rut: '45678901-2', apellidos: 'Rodríguez López' },
  { id: 4, nombres: 'Leonardo Iván', rut: '20424317-4', apellidos: 'Espinoza Ortiz' },
  // Agrega más estudiantes según sea necesario
];

const ListaEstudiantes = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscarEstudiantes = (terminoBusqueda) => {
    const terminos = terminoBusqueda.toLowerCase().trim().split(' ');

    const resultadosFiltrados = estudiantesEjemplo.filter((estudiante) =>
      terminos.every((termino) =>
        estudiante.nombres.toLowerCase().includes(termino) ||
        estudiante.apellidos.toLowerCase().includes(termino) ||
        estudiante.rut.includes(termino)
      )
    );

    setResultados(resultadosFiltrados);
  };

  // Llama a la función de búsqueda cada vez que cambia el valor del campo de búsqueda
  const handleInputChange = (e) => {
    const nuevoTermino = e.target.value;
    setBusqueda(nuevoTermino);
    buscarEstudiantes(nuevoTermino);
  };

  return (
    <div>
      <Navbar />
      <div className="lista-estudiantes">
        <h2>Lista de Estudiantes</h2>
        <div className="buscador">
          <input
            type="text"
            placeholder="Buscar por nombres, apellidos o rut"
            value={busqueda}
            onChange={handleInputChange}
          />
        </div>
        <ul>
          {resultados.length > 0 ? (
            resultados.map((estudiante) => (
              <li key={estudiante.id} className="resultado">
                <strong>{estudiante.nombres}</strong> - {estudiante.apellidos} - {estudiante.rut}
                <Link to={`/estudiante/${estudiante.id}`}>
                  <button className="ver-perfil">Ver Perfil</button>
                </Link>
              </li>
            ))
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListaEstudiantes;
