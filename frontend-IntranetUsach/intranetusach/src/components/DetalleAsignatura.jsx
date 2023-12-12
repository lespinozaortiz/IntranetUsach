// DetalleAsignatura.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import './DetalleAsignatura.css'; 
import axios from 'axios';

const DetalleAsignatura = () => {
  const { id } = useParams();
  const [asignatura, setAsignatura] = useState({});
  const [estudiantesCursando, setEstudiantesCursando] = useState([]);
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener detalles de la asignatura
        const asignaturaResponse = await axios.get(`http://localhost:8090/api/asignaturas/${id}`);
        if (asignaturaResponse.data) {
          setAsignatura(asignaturaResponse.data);
        } else {
          console.error('Error al obtener detalles de la asignatura');
        }

        // Obtener estudiantes cursando la asignatura
        const estudiantesResponse = await axios.get(`http://localhost:8090/api/asigcursadas/${id}`);
        if (estudiantesResponse.data) {
          setEstudiantesCursando(estudiantesResponse.data);
        } else {
          console.error('Error al obtener estudiantes cursando');
        }

        // Obtener horarios de la asignatura
        const horariosResponse = await axios.get(`http://localhost:8090/api/horarios/getByAsignatura?codAsignatura=${id}`);
        if (horariosResponse.data) {
          setHorarios(horariosResponse.data);
        } else {
          console.error('Error al obtener horarios de la asignatura');
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
          <div>
            Carrera: {asignatura.carrera ? asignatura.carrera.nombrecarrera : 'No disponible'}
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

        <h3>Horarios</h3>
        <ul className="horarios-list">
          {horarios.map(horario => (
            <li key={horario.id_horario} className="horario-item">
              <div>
                <strong>Día:</strong> {horario.dia}
              </div>
              <div>
                <strong>Módulo:</strong> {horario.modulo}
              </div>
              <div>
                <strong>Hora Inicio:</strong> {horario.hora_inicio}
              </div>
              <div>
                <strong>Hora Final:</strong> {horario.hora_final}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetalleAsignatura;
