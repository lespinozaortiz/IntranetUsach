// components/Home.js
import React from 'react';
import './Home.css';

const Home = () => {
  // Datos de ejemplo para noticias
  const noticias = [
    {
      id: 1,
      titulo: "Inicio del Semestre Otoño 2023",
      fecha: "10 de Marzo, 2023",
      contenido: "El próximo lunes 13 de marzo comienza oficialmente el semestre de otoño. Revisa tu horario en la plataforma.",
      destacada: true
    },
    {
      id: 2,
      titulo: "Taller de Programación Avanzada",
      fecha: "5 de Marzo, 2023",
      contenido: "Inscripciones abiertas para el taller de programación avanzada que se realizará todos los viernes de marzo.",
      destacada: false
    },
    {
      id: 3,
      titulo: "Convocatoria Ayudantías",
      fecha: "28 de Febrero, 2023",
      contenido: "Se abre convocatoria para ayudantías en asignaturas de primer y segundo año. Postula hasta el 15 de marzo.",
      destacada: true
    }
  ];

  return (
    <div className="home-container">
      <div className="welcome-banner">
        <h1>Bienvenido a Intranet Fing USACH</h1>
        <p>Tu plataforma académica para gestionar tu carrera</p>
      </div>
      
      <div className="content-grid">
        <main className="main-content">
          <section className="noticias-section">
            <div className="section-header">
              <h2><i className="fas fa-newspaper"></i> Noticias e Información</h2>
              <button className="view-all">Ver todas</button>
            </div>
            
            <div className="noticias-grid">
              {noticias.map(noticia => (
                <div 
                  key={noticia.id} 
                  className={`noticia-card ${noticia.destacada ? 'destacada' : ''}`}
                >
                  {noticia.destacada && <div className="destacada-label">Destacada</div>}
                  <h3>{noticia.titulo}</h3>
                  <div className="noticia-meta">
                    <span><i className="far fa-calendar"></i> {noticia.fecha}</span>
                  </div>
                  <p>{noticia.contenido}</p>
                  <button className="read-more">Leer más</button>
                </div>
              ))}
            </div>
          </section>
          
          <section className="quick-actions">
            <h2><i className="fas fa-bolt"></i> Acciones Rápidas</h2>
            <div className="actions-grid">
              <div className="action-card">
                <i className="fas fa-book"></i>
                <h3>Inscribir Asignaturas</h3>
                <p>Gestiona tu matrícula académica</p>
              </div>
              <div className="action-card">
                <i className="fas fa-calendar-alt"></i>
                <h3>Ver Horarios</h3>
                <p>Consulta tus clases y actividades</p>
              </div>
              <div className="action-card">
                <i className="fas fa-file-alt"></i>
                <h3>Documentos</h3>
                <p>Accede a tus certificados</p>
              </div>
              <div className="action-card">
                <i className="fas fa-chart-bar"></i>
                <h3>Calificaciones</h3>
                <p>Consulta tu rendimiento</p>
              </div>
            </div>
          </section>
        </main>
        
        <aside className="sidebar">
          <section className="informacion-inscripcion">
            <div className="section-header">
              <h2><i className="fas fa-info-circle"></i> Información para Inscripción</h2>
            </div>
            <div className="info-content">
              <ul>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Cada semestre lectivo, los estudiantes deben cursar al menos 3 asignaturas de su plan de estudios para mantenerse en la carrera.</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Se puede tomar un ramo solo si ha pasado los prerrequisitos.</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Las asignaturas pueden ser cursadas para su aprobación hasta en 2 ocasiones. Reprobar 2 veces es eliminación.</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Las asignaturas de nivel 1 pueden cursarse hasta en 3 oportunidades.</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>No debe haber tope de horario.</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Cada ramo tiene cupo máximo de estudiantes.</span>
                </li>
              </ul>
              <div className="info-footer">
                <button className="inscripcion-btn">
                  <i className="fas fa-pen"></i> Iniciar Inscripción
                </button>
              </div>
            </div>
          </section>
          
          <section className="calendario">
            <div className="section-header">
              <h2><i className="far fa-calendar"></i> Próximos Eventos</h2>
            </div>
            <div className="eventos">
              <div className="evento">
                <div className="evento-fecha">
                  <span className="dia">15</span>
                  <span className="mes">Mar</span>
                </div>
                <div className="evento-info">
                  <h3>Inicio de Clases</h3>
                  <p>Comienzo del semestre académico</p>
                </div>
              </div>
              <div className="evento">
                <div className="evento-fecha">
                  <span className="dia">22</span>
                  <span className="mes">Mar</span>
                </div>
                <div className="evento-info">
                  <h3>Taller Python</h3>
                  <p>Laboratorio 302, 15:00 hrs</p>
                </div>
              </div>
              <div className="evento">
                <div className="evento-fecha">
                  <span className="dia">05</span>
                  <span className="mes">Abr</span>
                </div>
                <div className="evento-info">
                  <h3>Fin de Inscripciones</h3>
                  <p>Cierre de periodo de matrícula</p>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Home;