// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const logoUrl = 'https://www.mem.dmcc.usach.cl/wp-content/uploads/2021/08/usach_dmcc.png';

  return (
    <div className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={logoUrl} alt="Logo USACH" className="logo" />
          <div className="facultad">
            <span>FACULTAD DE INGENIERÍA</span>
            <span>Departamento de Matemática y Ciencia de la Computación</span>
          </div>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/"><i className="fas fa-home"></i> Inicio</Link>
        <Link to="/lista-estudiantes"><i className="fas fa-users"></i> Estudiantes</Link>
        <Link to="/inscribir-asignaturas"><i className="fas fa-book"></i> Inscripción</Link>
        <Link to="/asignaturas"><i className="fas fa-book-open"></i> Asignaturas</Link>
        <Link to="/ingreso-horario"><i className="fas fa-calendar-alt"></i> Horarios</Link>
        <Link to="/malla"><i className="fas fa-project-diagram"></i> Malla</Link>
      </div>
      <div className="user-actions">
        <div className="user-info">
          <i className="fas fa-user-circle"></i>
          <span>Usuario</span>
        </div>
        <button className="logout-btn">
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;