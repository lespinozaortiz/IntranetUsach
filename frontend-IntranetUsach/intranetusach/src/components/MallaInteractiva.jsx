// InscripcionAsignaturas.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MallaInteractiva = () => {
  const [estudiante, setEstudiante] = useState({});
  const [asignaturasAprobadas, setAsignaturasAprobadas] = useState([]);
  const [asignaturasInscritas, setAsignaturasInscritas] = useState([]);
  const [asignaturasDisponibles, setAsignaturasDisponibles] = useState([]);
  const [historialNotas, setHistorialNotas] = useState([]);

  useEffect(() => {
    // Aquí realiza las solicitudes necesarias para obtener la información del estudiante, asignaturas, etc.
    const fetchData = async () => {
      try {
        // Ejemplo de solicitud para obtener datos del estudiante (reemplaza la URL con la correcta)
        const estudianteResponse = await axios.get('http://localhost:8090/api/estudiantes/123');
        setEstudiante(estudianteResponse.data);

        // Ejemplo de solicitud para obtener asignaturas aprobadas (reemplaza la URL con la correcta)
        const asignaturasAprobadasResponse = await axios.get('http://localhost:8090/api/asignaturas/aprobadas/123');
        setAsignaturasAprobadas(asignaturasAprobadasResponse.data);

        // Agrega solicitudes adicionales según sea necesario
        // ...

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); // La dependencia vacía asegura que el efecto se ejecute solo una vez al montar el componente

  // Función para manejar la inscripción de una asignatura
  const inscribirAsignatura = async (codAsignatura) => {
    try {
      // Ejemplo de solicitud para inscribir asignatura (reemplaza la URL con la correcta)
      await axios.post(`http://localhost:8090/api/inscripcion/estudiante/${estudiante.rut}/asignatura/${codAsignatura}`);
      
      // Actualiza la lista de asignaturas inscritas después de la inscripción
      const asignaturasInscritasResponse = await axios.get(`http://localhost:8090/api/asignaturas/inscritas/${estudiante.rut}`);
      setAsignaturasInscritas(asignaturasInscritasResponse.data);

      // Actualiza la lista de asignaturas disponibles después de la inscripción
      const asignaturasDisponiblesResponse = await axios.get('http://localhost:8090/api/asignaturas/disponibles');
      setAsignaturasDisponibles(asignaturasDisponiblesResponse.data);

      // Agrega actualizaciones adicionales según sea necesario
      // ...

    } catch (error) {
      console.error('Error al inscribir asignatura:', error);
    }
  };

  return (
    <div>
      <h2>Inscripción de Asignaturas</h2>
      <p>Estudiante: {estudiante.nombres} {estudiante.apellidos}</p>

      <h3>Asignaturas Aprobadas</h3>
      <ul>
        {asignaturasAprobadas.map(asignatura => (
          <li key={asignatura.codasig}>{asignatura.nombreasig}</li>
        ))}
      </ul>

      <h3>Asignaturas Inscritas</h3>
      <ul>
        {asignaturasInscritas.map(asignatura => (
          <li key={asignatura.codasig}>{asignatura.nombreasig}</li>
        ))}
      </ul>

      <h3>Asignaturas Disponibles</h3>
      <ul>
        {asignaturasDisponibles.map(asignatura => (
          <li key={asignatura.codasig}>
            {asignatura.nombreasig} - 
            <button onClick={() => inscribirAsignatura(asignatura.codasig)}>Inscribir</button>
          </li>
        ))}
      </ul>

      {/* Agrega secciones y componentes adicionales para mostrar el historial de notas, etc. */}
    </div>
  );
};

export default MallaInteractiva;
