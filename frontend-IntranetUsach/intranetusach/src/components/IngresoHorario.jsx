import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './IngresoHorario.css'; // Asegúrate de importar el archivo CSS

const IngresoHorario = () => {
  const [horario, setHorario] = useState({
    asignaturaId: '',
    dia: '',
    modulo: '',
    horaInicio: '',
    horaFinal: '',
  });

  const [diasOptions] = useState(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']);

  const [modulosOptions, setModulosOptions] = useState({
    Lunes: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'],
    Martes: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7'],
    Miércoles: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
    Jueves: ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7'],
    Viernes: ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7'],
    Sábado: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'],
  });

  const [horasInicioFin, setHorasInicioFin] = useState({
    'L1': ['08:15', '09:35'],
    'L2': ['09:50', '11:10'],
    'L3': ['11:25', '12:45'],
    'L4': ['13:45', '15:05'],
    'L5': ['15:20', '16:40'],
    'L6': ['16:55', '18:15'],
    'L7': ['18:45', '20:05'],
    'M1': ['08:15', '09:35'],
    'M2': ['09:50', '11:10'],
    'M3': ['11:25', '12:45'],
    'M4': ['13:45', '15:05'],
    'M5': ['15:20', '16:40'],
    'M6': ['16:55', '18:15'],
    'M7': ['18:45', '20:05'],
    'W1': ['08:15', '09:35'],
    'W2': ['09:50', '11:10'],
    'W3': ['11:25', '12:45'],
    'W4': ['13:45', '15:05'],
    'W5': ['15:20', '16:40'],
    'W6': ['16:55', '18:15'],
    'W7': ['18:45', '20:05'],
    'J1': ['08:15', '09:35'],
    'J2': ['09:50', '11:10'],
    'J3': ['11:25', '12:45'],
    'J4': ['13:45', '15:05'],
    'J5': ['15:20', '16:40'],
    'J6': ['16:55', '18:15'],
    'J7': ['18:45', '20:05'],
    'V1': ['08:15', '09:35'],
    'V2': ['09:50', '11:10'],
    'V3': ['11:25', '12:45'],
    'V4': ['13:45', '15:05'],
    'V5': ['15:20', '16:40'],
    'V6': ['16:55', '18:15'],
    'V7': ['18:45', '20:05'],
    'S1': ['08:15', '09:35'],
    'S2': ['09:50', '11:10'],
    'S3': ['11:25', '12:45'],
    'S4': ['13:45', '15:05'],
    'S5': ['15:20', '16:40'],
    'S6': ['16:55', '18:15'],
    'S7': ['18:45', '20:05'],
    
  });

  const [alerta, setAlerta] = useState({
    tipo: '',
    mensaje: '',
  });

  const handleDiaChange = (e) => {
    const selectedDia = e.target.value;
    setHorario({ ...horario, dia: selectedDia, modulo: '', horaInicio: '', horaFinal: '' });

    // Si hay un día seleccionado, actualiza los módulos disponibles
    if (selectedDia) {
      setModulosOptions({
        ...modulosOptions,
        [selectedDia]: modulosOptions[selectedDia],
      });
    }
  };

  const handleModuloChange = (e) => {
    const selectedModulo = e.target.value;

    // Verifica que selectedModulo esté definido y sea una clave en horasInicioFin
    if (selectedModulo && horasInicioFin.hasOwnProperty(selectedModulo)) {
      setHorario({
        ...horario,
        modulo: selectedModulo,
        horaInicio: horasInicioFin[selectedModulo][0],
        horaFinal: horasInicioFin[selectedModulo][1],
      });
    } else {
      console.error('Error al seleccionar el módulo:', selectedModulo);
    }
  };

  const handleGuardarHorario = async () => {
    try {
      const response = await axios.post('http://localhost:8090/api/horarios/agregar', {
        asignatura: { codasig: Number(horario.asignaturaId) },
        dia: horario.dia,
        modulo: horario.modulo,
        hora_inicio: horario.horaInicio,
        hora_final: horario.horaFinal,
      });

      console.log('Horario guardado:', response.data);

      setAlerta({ tipo: 'success', mensaje: 'Horario guardado correctamente.' });
    } catch (error) {
      console.error('Error al guardar el horario:', error);

      setAlerta({ tipo: 'error', mensaje: 'No se pudo guardar el horario. Inténtalo de nuevo.' });
    }
  };

  return (
    <div className="pagina">
      <Navbar />
      <div className="horario-form">
        <h2>Ingreso de Horario-Asignatura</h2>

        {alerta.tipo && (
          <div className={`alerta ${alerta.tipo}`}>
            {alerta.mensaje}
          </div>
        )}

        <label>ID de Asignatura: </label>
        <input
          type="text"
          value={horario.asignaturaId}
          onChange={(e) => setHorario({ ...horario, asignaturaId: e.target.value })}
        />

        <label>Día: </label>
        <select value={horario.dia} onChange={handleDiaChange}>
          <option value="">Seleccione un día</option>
          {diasOptions.map((dia) => (
            <option key={dia} value={dia}>
              {dia}
            </option>
          ))}
        </select>

        <label>Módulo: </label>
        <select value={horario.modulo} onChange={handleModuloChange}>
          <option value="">Seleccione un módulo</option>
          {horario.dia &&
            modulosOptions[horario.dia].map((modulo) => (
              <option key={modulo} value={modulo}>
                {modulo}
              </option>
            ))}
        </select>

        <label>Hora de Inicio: </label>
        <input
          type="text"
          value={horario.horaInicio}
          onChange={(e) => setHorario({ ...horario, horaInicio: e.target.value })}
          disabled
        />

        <label>Hora Final: </label>
        <input
          type="text"
          value={horario.horaFinal}
          onChange={(e) => setHorario({ ...horario, horaFinal: e.target.value })}
          disabled
        />

        <button onClick={handleGuardarHorario}>Guardar Horario</button>
      </div>
    </div>
  );
};

export default IngresoHorario;
