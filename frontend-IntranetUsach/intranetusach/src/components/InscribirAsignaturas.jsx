// Importa useState y useEffect desde 'react'
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './InscribirAsignaturas.css';

const InscribirAsignaturas = () => {
  const [rut, setRut] = useState('');
  const [codAsignatura, setCodAsignatura] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [nombreAsignatura, setNombreAsignatura] = useState('');

  useEffect(() => {
    // Función para obtener el nombre de la asignatura
    const obtenerNombreAsignatura = async () => {
      try {
        if (!codAsignatura) {
          setNombreAsignatura('');
          return;
        }

        const response = await fetch(`http://localhost:8090/api/asignaturas/${codAsignatura}`);
        console.log('Respuesta del servidor:', response);

        const data = await response.json();

        if (response.ok) {
          // Asumimos que la respuesta es un objeto JSON con el campo 'nombreasig'
          setNombreAsignatura(data && data.nombreasig ? data.nombreasig : 'Nombre no disponible');
        } else {
          setNombreAsignatura('Nombre no disponible');
        }
      } catch (error) {
        console.error('Error al obtener el nombre de la asignatura:', error);
        setNombreAsignatura('Nombre no disponible');
      }
    };

    // Llama a la función para obtener el nombre de la asignatura cuando cambia el código
    obtenerNombreAsignatura();
  }, [codAsignatura]);

  const handleInscribir = async () => {
    try {
      // Validación de entrada
      if (!rut || !codAsignatura) {
        setMensaje('Por favor, completa todos los campos.');
        return;
      }

      // Realizar la solicitud HTTP para inscribir la asignatura
      const response = await fetch('http://localhost:8090/api/inscripcion/inscribir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut: rut, cod_Asignatura: codAsignatura }),
        mode: 'cors',
      });

      console.log('Respuesta completa:', response);

      // Manejar la respuesta exitosa
      if (response.ok) {
        const data = await response.json();
        setMensaje(data.message); // Ajusta según la estructura real de la respuesta
      } else {
        // Manejar errores de respuesta no exitosa
        const errorData = await response.json();
        handleErrorResponse(errorData);
      }
    } catch (error) {
      // Manejar el error
      console.error('Error al realizar la solicitud:', error);
      setMensaje(error.message || 'Error desconocido');
    }
  };

  const handleErrorResponse = (errorData) => {
    // Manejar diferentes casos de error
    if (errorData.message === 'La asignatura no pertenece a la carrera del estudiante') {
      setMensaje('Error: La asignatura no pertenece a la carrera del estudiante');
    } else if (errorData.message === 'El estudiante ya ha alcanzado el máximo de asignaturas permitidas para su carrera y nivel') {
      setMensaje('Error: El estudiante ya ha alcanzado el máximo de asignaturas permitidas para su carrera y nivel');
    } else if (errorData.message === 'El estudiante no ha aprobado los prerequisitos de la asignatura') {
      setMensaje('Error: El estudiante no ha aprobado los prerequisitos de la asignatura');
    } else if (errorData.message === 'El estudiante ya ha cursado la asignatura 3 veces' || errorData.message === 'El estudiante ya ha cursado la asignatura 2 veces') {
      setMensaje(`Error: ${errorData.message}`);
    } else if (errorData.message === 'No hay cupo disponible en la asignatura') {
      setMensaje('Error: No hay cupo disponible en la asignatura');
    } else if (errorData.message === 'Ya hay un tope de horario para este módulo') {
      setMensaje('Error: Ya hay un tope de horario para este módulo');
    } else {
      setMensaje(`Error desconocido: ${errorData.message}`);
    }
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
        {/* Nuevo div para mostrar el nombre de la asignatura */}
        <div className="input-container">
          <label>Nombre de la asignatura:</label>
          <p>{nombreAsignatura}</p>
        </div>
        <button onClick={handleInscribir}>Inscribir Asignatura</button>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
};

export default InscribirAsignaturas;
