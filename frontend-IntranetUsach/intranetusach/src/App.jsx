// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ListaEstudiantes from './components/ListaEstudiantes';
import Estudiante from './components/Estudiante';
import InscribirAsignaturas from './components/InscribirAsignaturas';
import Asignaturas from './components/Asignaturas';
import IngresoHorario from './components/IngresoHorario';
import DetalleAsignatura from './components/DetalleAsignatura';
import MallaInteractiva from './components/MallaInteractiva';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lista-estudiantes" element={<ListaEstudiantes />} />
        <Route path="/estudiante/:id" element={<Estudiante />} />
        <Route path="/inscribir-asignaturas" element={<InscribirAsignaturas />} />
        <Route path="/asignaturas" element={<Asignaturas />} />
        <Route path="/ingreso-horario" element={<IngresoHorario />} />
        <Route path="/ver-asignatura/:id" element={<DetalleAsignatura />} />
        <Route path="/malla" element={<MallaInteractiva />} />

      </Routes>
    </Router>
  );
};

export default App;

