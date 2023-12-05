import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import './DetalleAsignatura.css'; // Agrega tu archivo de estilos

const DetalleAsignatura = () => {
  const { id } = useParams();
  const [asignatura, setAsignatura] = useState({});
  const [estudiantesCursando, setEstudiantesCursando] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener detalles de la asignatura
        const asignaturaResponse = await fetch(`http://localhost:8090/api/asignaturas/${id}`);
        if (asignaturaResponse.ok) {
          const asignaturaData = await asignaturaResponse.json();
          setAsignatura(asignaturaData);
        } else {
          console.error('Error al obtener detalles de la asignatura:', asignaturaResponse.statusText);
        }

        // Obtener estudiantes cursando la asignatura
        const estudiantesResponse = await fetch(`http://localhost:8090/api/asigcursadas/${id}`);
        if (estudiantesResponse.ok) {
          const estudiantesData = await estudiantesResponse.json();
          setEstudiantesCursando(estudiantesData);
        } else {
          console.error('Error al obtener estudiantes cursando:', estudiantesResponse.statusText);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Detalles de la Asignatura</h2>
        <div className="asignatura-detalle">
          <div>
            <strong>{asignatura.nombreasig}</strong> - {asignatura.codasig}
          </div>
          <div>
            Cantidad de Estudiantes: {asignatura.cantidadestudiantes}
          </div>
        </div>

        <h3>Estudiantes Cursando</h3>
        <ul className="estudiantes-list">
          {estudiantesCursando.map(asigcursada => (
            <li key={asigcursada.idasigcursadas} className="estudiante-item">
              <div>
                <strong>Nombre:</strong> {asigcursada.estudiante.nombres}
              </div>
              <div>
                <strong>RUT:</strong> {asigcursada.estudiante.rut}
              </div>
              <div>
                <strong>Apellidos:</strong> {asigcursada.estudiante.apellidos}
              </div>
              <div>
                <strong>Email:</strong> {asigcursada.estudiante.email}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetalleAsignatura;
