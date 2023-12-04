import React, { useState } from 'react';
import Navbar from './Navbar';

const InscribirAsignaturas = () => {
  const [rut, setRut] = useState('');
  const [codAsignatura, setCodAsignatura] = useState('');
  const [mensaje, setMensaje] = useState('');

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
        setMensaje(`Error: ${errorData.error || 'Error desconocido'}`);
      }
    } catch (error) {
      // Manejar el error
      console.error('Error al realizar la solicitud:', error);
      setMensaje(error.message || 'Error desconocido');
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Inscribir Asignaturas</h2>
      <div>
        <label>RUT del estudiante:</label>
        <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} />
      </div>
      <div>
        <label>Código de asignatura:</label>
        <input type="text" value={codAsignatura} onChange={(e) => setCodAsignatura(e.target.value)} />
      </div>
      <button onClick={handleInscribir}>Inscribir Asignatura</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default InscribirAsignaturas;
