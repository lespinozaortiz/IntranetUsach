// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Archivo de estilos CSS

const Navbar = () => {
  const logoUrl = 'https://www.mem.dmcc.usach.cl/wp-content/uploads/2021/08/usach_dmcc.png';

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          {/* Utiliza la URL directamente para cargar la imagen */}
          <img src={logoUrl} alt="Logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/lista-estudiantes">Lista de Estudiantes</Link>
        <Link to="/inscribir-asignaturas">Inscribir Asignaturas</Link>
        <Link to="/asignaturas">Asignaturas</Link>
        <Link to="/ingreso-horario">Ingresar Horarios</Link>
        {/* Agrega otros enlaces según sea necesario */}
      </div>
    </div>
  );
};

export default Navbar;
