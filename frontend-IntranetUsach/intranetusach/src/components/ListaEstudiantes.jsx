// components/ListaEstudiantes.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios'; // Importa axios
import './ListaEstudiantes.css'; // Importa el archivo de estilos CSS

const ListaEstudiantes = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const resultadosRef = useRef(resultados);

  useEffect(() => {
    const obtenerEstudiantes = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/estudiantes/todos');
        setResultados(response.data);
        resultadosRef.current = response.data; // Actualiza la referencia con el valor más reciente
      } catch (error) {
        console.error('Error al obtener la lista de estudiantes:', error);
      }
    };

    obtenerEstudiantes();
  }, []); // Se ejecuta una vez al montar el componente

  const buscarEstudiantes = (terminoBusqueda) => {
    const terminos = terminoBusqueda.toLowerCase().trim().split(' ');

    const resultadosFiltrados = resultadosRef.current.filter((estudiante) =>
      terminos.every((termino) =>
        estudiante.nombres.toLowerCase().includes(termino) ||
        estudiante.apellidos.toLowerCase().includes(termino) ||
        estudiante.rut.includes(termino)
      )
    );

    setResultados(resultadosFiltrados);
  };

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

        {resultados.length > 0 ? (
          <ul>
            <li className="cabecera">
              <span>Rut</span>
              <span>Nombres</span>
              <span>Apellidos</span>
              {/* Agrega más cabeceras según tus datos */}
              <span>Ver Perfil</span>
            </li>
            {resultados.map((estudiante) => (
              <li key={estudiante.rut} className="datos-estudiante">
                <span>{estudiante.rut}</span>
                <span>{estudiante.nombres}</span>
                <span>{estudiante.apellidos}</span>
                {/* Agrega más datos según tus campos */}
                <Link to={`/estudiante/${estudiante.rut}`}>
                  <button className="ver-perfil">Ver Perfil</button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default ListaEstudiantes;
