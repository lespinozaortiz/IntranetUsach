// Importa useState y useEffect desde 'react'
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
        setExitoInscripcion(false);
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
        setExitoInscripcion(true);
        setMensaje('Inscripción exitosa.');
      } else {
        const errorData = await response.json();
        setExitoInscripcion(false);
        handleErrorResponse(errorData);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setExitoInscripcion(false);
      setMensaje(error.message || 'Error desconocido');
    }
  };

  const handleErrorResponse = (errorData) => {
    // ... (mantén esta función como está)
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
