import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './IngresoHorario.css';

const IngresoHorario = () => {
  const [horario, setHorario] = useState({
    asignaturaId: '',
    dia: '',
    modulo: '',
    horaInicio: '',
    horaFinal: '',
  });

  const [diasOptions] = useState(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']);
  const [modulosOptions, setModulosOptions] = useState([]);

  const [asignaturaNombre, setAsignaturaNombre] = useState('');

  const [alerta, setAlerta] = useState({
    tipo: '',
    mensaje: '',
  });

  useEffect(() => {
    const fetchAsignaturaNombre = async () => {
      try {
        if (horario.asignaturaId) {
          const response = await axios.get(`http://localhost:8090/api/asignaturas/${horario.asignaturaId}`);
          setAsignaturaNombre(response.data ? response.data.nombreasig || 'Nombre no disponible' : 'Nombre no disponible');
        }
      } catch (error) {
        console.error('Error al obtener el nombre de la asignatura:', error);
        setAsignaturaNombre('Nombre no disponible');
      }
    };

    fetchAsignaturaNombre();
  }, [horario.asignaturaId]);

  const handleDiaChange = (e) => {
    const selectedDia = e.target.value;
    setHorario({ ...horario, dia: selectedDia, modulo: '', horaInicio: '', horaFinal: '' });

    // Calcular las opciones de módulos para el día seleccionado
    if (selectedDia) {
      const letraDia = selectedDia.charAt(0).toUpperCase();
      setModulosOptions([...Array(7).keys()].map((i) => `${letraDia}${i + 1}`));
    } else {
      setModulosOptions([]);
    }
  };

  const handleModuloChange = (e) => {
    const selectedModulo = e.target.value;

    // Calcular las horas de inicio y final para el módulo seleccionado
    if (selectedModulo && horario.dia) {
      const horasInicio = `${selectedModulo.charAt(1) * 2 + 6}:15`;
      const horasFinal = `${selectedModulo.charAt(1) * 2 + 7}:35`;

      setHorario({
        ...horario,
        modulo: selectedModulo,
        horaInicio: horasInicio,
        horaFinal: horasFinal,
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
      setHorario({
        asignaturaId: '',
        dia: '',
        modulo: '',
        horaInicio: '',
        horaFinal: '',
      });
    } catch (error) {
      console.error('Error al guardar el horario:', error);

      if (error.response && error.response.status === 400) {
        setAlerta({ tipo: 'error', mensaje: 'Ese horario ya existe. Inténtalo de nuevo.' });
      } else {
        setAlerta({ tipo: 'error', mensaje: 'No se pudo guardar el horario. Inténtalo de nuevo.' });
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="pagina">
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

          <div>Nombre de la Asignatura: {asignaturaNombre}</div>

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
            {modulosOptions.map((modulo) => (
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
    </div>
  );
};

export default IngresoHorario;
