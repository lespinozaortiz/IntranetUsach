import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const IngresoHorario = () => {
  const [horario, setHorario] = useState({
    asignaturaId: '', // Utilizar el ID de la asignatura
    dia: '',
    modulo: '',
    horaInicio: '', // Ajusta el formato según tus necesidades
    horaFinal: '', // Ajusta el formato según tus necesidades
  });

  const handleGuardarHorario = async () => {
    try {
      const response = await axios.post('/api/horarios/agregar', {
        asignatura: { cod_asignatura: horario.asignaturaId }, // Usar el ID de la asignatura
        dia: horario.dia,
        modulo: horario.modulo,
        hora_inicio: horario.horaInicio,
        hora_final: horario.horaFinal,
      });
      console.log('Horario guardado:', response.data);
    } catch (error) {
      console.error('Error al guardar el horario:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Ingreso de Horario-Asignatura</h2>
      <label>ID de Asignatura: </label>
      <input
        type="text"
        value={horario.asignaturaId}
        onChange={(e) => setHorario({ ...horario, asignaturaId: e.target.value })}
      />

      <label>Día: </label>
      <input
        type="text"
        value={horario.dia}
        onChange={(e) => setHorario({ ...horario, dia: e.target.value })}
      />

      <label>Módulo: </label>
      <input
        type="text"
        value={horario.modulo}
        onChange={(e) => setHorario({ ...horario, modulo: e.target.value })}
      />

      <label>Hora de Inicio: </label>
      <input
        type="text"
        value={horario.horaInicio}
        onChange={(e) => setHorario({ ...horario, horaInicio: e.target.value })}
      />

      <label>Hora Final: </label>
      <input
        type="text"
        value={horario.horaFinal}
        onChange={(e) => setHorario({ ...horario, horaFinal: e.target.value })}
      />

      <button onClick={handleGuardarHorario}>Guardar Horario</button>
    </div>
  );
};

export default IngresoHorario;
