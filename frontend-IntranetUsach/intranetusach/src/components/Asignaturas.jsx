import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Asignaturas.css'; // Importa el archivo de estilos
import { Link } from 'react-router-dom';

const Asignaturas = () => {
  const [asignaturas, setAsignaturas] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    // Realizar la solicitud a la API para obtener todas las asignaturas
    fetch('http://localhost:8090/api/asignaturas')
      .then(response => response.json())
      .then(data => setAsignaturas(data))
      .catch(error => console.error('Error al obtener asignaturas:', error));
  }, []);

  const filtrarAsignaturas = () => {
    return asignaturas.filter(asignatura => {
      return asignatura.nombreasig.toLowerCase().includes(filtro.toLowerCase()) ||
             asignatura.codasig.toString().includes(filtro);
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Lista de Asignaturas</h2>
        <input
          type="text"
          placeholder="Buscar por nombre o código"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        {filtrarAsignaturas().map(asignatura => (
          <div key={asignatura.codasig} className="asignatura-item">
            <div>
              <strong>{asignatura.nombreasig}</strong> - {asignatura.codasig}
            </div>
            <div>
              Cantidad de Estudiantes: {asignatura.cantidadestudiantes}
            </div>
            <Link to={`/ver-asignatura/${asignatura.codasig}`}>
              <button>
                Ver Asignatura
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Asignaturas;
