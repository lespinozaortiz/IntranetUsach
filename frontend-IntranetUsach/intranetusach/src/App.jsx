// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ListaEstudiantes from './components/ListaEstudiantes';
import Estudiante from './components/Estudiante';
import InscribirAsignaturas from './components/InscribirAsignaturas';
import Asignaturas from './components/Asignaturas';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lista-estudiantes" element={<ListaEstudiantes />} />
        <Route path="/estudiante/:id" element={<Estudiante />} />
        <Route path="/inscribir-asignaturas" element={<InscribirAsignaturas />} />
        <Route path="/asignaturas" element={<Asignaturas />} />
      </Routes>
    </Router>
  );
};

export default App;

