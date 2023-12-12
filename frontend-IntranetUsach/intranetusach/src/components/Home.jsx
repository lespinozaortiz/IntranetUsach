// components/Home.js
import React from 'react';
import Navbar from './Navbar';
import './Home.css'; // Archivo de estilos CSS

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
        <h2>Bienvenido a Intranet Fing USACH</h2>
        <section className="noticias">
          <h3>Noticias e Información</h3>
          <p>
            ¡Bienvenidos al semestre! Aquí encontrarás las últimas noticias y eventos importantes de la universidad.
          </p>
          {/* Contenido de noticias */}
        </section>
        <aside className="informacion-inscripcion">
          <h3>Información para la Inscripción de Asignaturas</h3>
          <ul>
            <li>Cada semestre lectivo, los estudiantes deben cursar al menos 3 asignaturas de su plan de estudios para mantenerse en la carrera.</li>
            <li>Se puede tomar un ramo solo si ha pasado los prerrequisitos.</li>
            <li>Las asignaturas pueden ser cursadas para su aprobación hasta en 2 ocasiones. Reprobar 2 veces es eliminación. Las asignaturas de nivel 1 pueden cursarse hasta en 3 oportunidades.</li>
            <li>No debe haber tope de horario.</li>
            <li>Cada ramo tiene cupo máximo de estudiantes.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Home;
