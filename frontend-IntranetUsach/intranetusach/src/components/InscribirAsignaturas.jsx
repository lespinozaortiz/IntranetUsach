import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './InscribirAsignaturas.css';

const InscribirAsignaturas = () => {
  const [rut, setRut] = useState('');
  const [codAsignatura, setCodAsignatura] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [nombreAsignatura, setNombreAsignatura] = useState('');
  const [exitoInscripcion, setExitoInscripcion] = useState(false);

  useEffect(() => {
    const obtenerNombreAsignatura = async () => {
      try {
        if (!codAsignatura) {
          setNombreAsignatura('');
          return;
        }

        const response = await fetch(`http://localhost:8090/api/asignaturas/${codAsignatura}`);
        const data = await response.json();

        if (response.ok) {
          setNombreAsignatura(data && data.nombreasig ? data.nombreasig : 'Nombre no disponible');
        } else {
          setNombreAsignatura('Nombre no disponible');
        }
      } catch (error) {
        console.error('Error al obtener el nombre de la asignatura:', error);
        setNombreAsignatura('Nombre no disponible');
      }
    };

    obtenerNombreAsignatura();
  }, [codAsignatura]);

  const handleInscribir = async () => {
    try {
      if (!rut || !codAsignatura) {
        setMensaje('Por favor, completa todos los campos.');
        setExitoInscripcion(false);
        return;
      }

      const response = await fetch('http://localhost:8090/api/inscripcion/inscribir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut: rut, cod_Asignatura: codAsignatura }),
        mode: 'cors',
      });

      if (response.ok) {
        setExitoInscripcion(true);
        setMensaje('Inscripción exitosa.');
      } else {
        const errorData = await response.json();
        setExitoInscripcion(false);

        if (response.status === 500 && errorData.error && errorData.error.includes("La asignatura no pertenece a la carrera del estudiante")) {
          setMensaje('Error al inscribir la asignatura: La asignatura no pertenece a la carrera del estudiante');
        } else if (response.status === 500 && errorData.error && errorData.error.includes("El estudiante ha alcanzado el máximo de asignaturas permitidas para su carrera y nivel")) {
          setMensaje('Error al inscribir la asignatura: El estudiante ha alcanzado el máximo de asignaturas permitidas para su carrera y nivel');
        } else if (response.status === 500 && errorData.error && errorData.error.includes("El estudiante no ha aprobado los prerequisitos de la asignatura")) {
          setMensaje('Error al inscribir la asignatura: El estudiante no ha aprobado los prerequisitos de la asignatura');
        } else if (response.status === 500 && errorData.error && errorData.error.includes("El estudiante ha cursado la asignatura el máximo de veces permitido")) {
          setMensaje('Error al inscribir la asignatura: El estudiante ha alcanzado el límite de veces permitido para cursar la asignatura');
        } else if (response.status === 500 && errorData.error && errorData.error.includes("No hay cupo disponible en la asignatura")) {
          setMensaje('Error al inscribir la asignatura: No hay cupo disponible en la asignatura');
        } else if (response.status === 500 && errorData.error && errorData.error.includes("Ya hay un tope de horario para este módulo")) {
          setMensaje('Error al inscribir la asignatura: Ya hay un tope de horario para este módulo');
        } else {
          // Imprimir el error en la consola del navegador
          console.error(errorData);

          handleErrorResponse(errorData);
        }
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);

      // Actualizar el estado con un mensaje de error genérico
      setExitoInscripcion(false);

      if (error.message && error.message.includes("query did not return a unique result")) {
        // Agregar un mensaje específico para el error de resultado no único
        setMensaje('Error al inscribir la asignatura: La consulta no devolvió un resultado único');
      } else {
        setMensaje('Error al inscribir la asignatura. Inténtalo de nuevo.');
      }
    }
  };

  const handleErrorResponse = (errorData) => {
    // Manejar otras situaciones de error si es necesario
    // Puedes agregar más lógica aquí para manejar diferentes tipos de errores
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Inscribir Asignaturas</h2>
        <div className="input-container">
          <label>RUT del estudiante:</label>
          <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} />
        </div>
        <div className="input-container">
          <label>Código de asignatura:</label>
          <input type="text" value={codAsignatura} onChange={(e) => setCodAsignatura(e.target.value)} />
        </div>
        <div className="input-container">
          <label>Nombre de la asignatura:</label>
          <p>{nombreAsignatura}</p>
        </div>
        <button onClick={handleInscribir}>Inscribir Asignatura</button>
        {mensaje && <p className={`mensaje ${exitoInscripcion ? 'exito' : 'error'}`}>{mensaje}</p>}
      </div>
    </div>
  );
};

export default InscribirAsignaturas;
