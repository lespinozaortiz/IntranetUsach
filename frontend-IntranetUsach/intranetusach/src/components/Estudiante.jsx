// components/Estudiante.js
import React from 'react';
import Navbar from './Navbar';
import './Estudiante.css'; // Archivo de estilos CSS

// Datos de ejemplo de estudiantes
const estudiantesEjemplo = [
  { id: 1, nombres: 'Juan Carlos', rut: '12345678-9', apellidos: 'Pérez González' },
  { id: 2, nombres: 'María Alejandra', rut: '98765432-1', apellidos: 'Gómez Smith' },
  { id: 3, nombres: 'Pedro Andrés', rut: '45678901-2', apellidos: 'Rodríguez López' },
  { id: 4, nombres: 'Leonardo Iván', rut: '20424317-4', apellidos: 'Espinoza Ortiz' },
  // Agrega más estudiantes según sea necesario
];

const Estudiante = ({ match }) => {
  // `match.params.id` contendrá el ID del estudiante desde la URL
  const estudianteId = parseInt(match?.params?.id, 10);

  // Busca al estudiante por su ID en los datos de ejemplo
  const estudiante = estudiantesEjemplo.find((e) => e.id === estudianteId);

  return (
    <div>
      <Navbar />
      <div className="perfil-estudiante">
        {estudiante ? (
          <>
            <h2>Perfil del Estudiante {estudianteId}</h2>
            <div className="informacion-estudiante">
              <p>
                <strong>Nombres:</strong> {estudiante.nombres}
              </p>
              <p>
                <strong>Apellidos:</strong> {estudiante.apellidos}
              </p>
              <p>
                <strong>RUT:</strong> {estudiante.rut}
              </p>
            </div>
            {/* Contenido adicional del perfil del estudiante y asignaturas inscritas */}
          </>
        ) : (
          <p>No se encontró el estudiante con ID {estudianteId}.</p>
        )}
      </div>
    </div>
  );
};

export default Estudiante;
