package com.example.IntranetUsach.Services;

import com.example.IntranetUsach.Entities.*;
import com.example.IntranetUsach.Services.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InscripcionService {

    @Autowired
    private EstudianteService estudianteService;

    @Autowired
    private AsignaturaService asignaturaService;

    @Autowired
    private PrerrequisitoService prerrequisitoService;

    @Autowired
    private NotaService notaService;

    @Autowired
    private AsigcursadasService asigcursadasService;

    @Autowired
    private HorariosService horariosService;

    public void inscribirAsignatura(String rut, Long cod_asignatura) {
        try {
            System.out.println("Llegó al inicio del método inscribirAsignatura");
            Estudiante estudiante = estudianteService.findByRut(rut);
            Asignatura asignatura = asignaturaService.findByCodAsignatura(cod_asignatura);
            System.out.println("Llegó a lectura datos del método inscribirAsignatura");

            // Verificar que la asignatura pertenezca a la carrera del estudiante
            if (!asignatura.getCarrera().equals(estudiante.getCarrera())) {
                throw new RuntimeException("La asignatura no pertenece a la carrera del estudiante");
            }
            System.out.println("pasa primer if");

            // Obtener todas las asignaturas de la carrera y nivel del estudiante
            List<Asignatura> asignaturasCarreraNivel = asignaturaService.findByCarreraAndNivel(estudiante.getCarrera(), estudiante.getNivel());

            // Verificar si el estudiante ya ha inscrito el máximo de asignaturas permitidas para su nivel
            if (asigcursadasService.countByEstudiante(estudiante) >= asignaturasCarreraNivel.size()) {
                throw new RuntimeException("El estudiante ha alcanzado el máximo de asignaturas permitidas para su carrera y nivel");
            }
            System.out.println("pasa segundo if");

            // Obtener todos los prerequisitos de la asignatura
            List<Prerrequisito> prerequisitos = prerrequisitoService.findByCodAsignatura(asignatura.getCodasig());

            // Verificar si el estudiante ha aprobado todos los prerequisitos
            if (!asigcursadasService.hasApprovedAllPrerequisites(estudiante, prerequisitos)) {
                throw new RuntimeException("El estudiante no ha aprobado los prerequisitos de la asignatura");
            }
            System.out.println("pasa tercer if");

            // Obtener el número de veces que el estudiante ha cursado la asignatura
            Integer vecesCursada = asigcursadasService.findVecesCursadaByEstudianteAndAsignatura(rut, cod_asignatura);
            System.out.println("Número de veces que el estudiante ha cursado la asignatura: " + vecesCursada);

            // Asignar 0 si el valor es nulo
            vecesCursada = (vecesCursada != null) ? vecesCursada : 0;

            if (vecesCursada != null) {
                int limiteCursadas = (asignatura.getNivel() == 1) ? 3 : 2;
                System.out.println("Límite de cursadas permitidas: " + limiteCursadas);
                System.out.println("Veces cursadas por el estudiante: " + vecesCursada);

                // Comprobar si el estudiante ya ha cursado la asignatura el número máximo de veces permitido
                if (vecesCursada >= limiteCursadas) {
                    throw new RuntimeException("El estudiante ha cursado la asignatura el máximo de veces permitido (" + limiteCursadas + " veces)");
                }
                System.out.println("pasa quinto if");
            }

            // Comprobar si hay cupo en la asignatura
            if (asignatura.getCantidadestudiantes() >= asignatura.getCupo()) {
                throw new RuntimeException("No hay cupo disponible en la asignatura");
            }
            System.out.println("pasa sexto if");

            // Comprobar si hay tope de horario
            List<Asigcursadas> asignaturasInscritas = asigcursadasService.findByEstudiante(estudiante);

            // Comprobar si hay tope de horario
            if (horariosService.hasScheduleConflict(asignaturasInscritas, asignatura, "modulo")) {
                throw new RuntimeException("Ya hay un tope de horario para este módulo");
            }
            System.out.println("pasa séptimo if");

            System.out.println("Llegó al final del método inscribirAsignatura");

            // Si todas las comprobaciones pasan, inscribir la asignatura
            Asigcursadas nuevaAsigcursadas = new Asigcursadas();
            nuevaAsigcursadas.setEstudiante(estudiante);
            nuevaAsigcursadas.setAsignatura(asignatura);
            nuevaAsigcursadas.setVecescursada(1);
            nuevaAsigcursadas.setEstado("en curso");
            asigcursadasService.save(nuevaAsigcursadas);

            // Incrementar la cantidad de estudiantes en la asignatura
            asignatura.setCantidadestudiantes(asignatura.getCantidadestudiantes() + 1);
            asignaturaService.save(asignatura);

            System.out.println("Asignatura guardada en la base de datos");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error al inscribir la asignatura: " + e.getMessage());
        }
    }



}

