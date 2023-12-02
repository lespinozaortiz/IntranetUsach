package com.example.IntranetUsach.Services;

import com.example.IntranetUsach.Entities.Asigcursadas;
import com.example.IntranetUsach.Entities.Asignatura;
import com.example.IntranetUsach.Entities.Estudiante;
import com.example.IntranetUsach.Entities.Prerrequisito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InscripcionService {

    @Autowired
    private AsigcursadasService asigcursadasService;

    @Autowired
    private PrerrequisitoService prerrequisitoService;

    @Autowired
    private EstudianteService estudianteService;

    // Otros servicios necesarios

    public void inscribirAsignatura(Estudiante estudiante, Asignatura asignatura) {
        // Verificar condiciones antes de inscribir
        if (cumpleCondicionesInscripcion(estudiante, asignatura)) {
            // Verificar disponibilidad de cupo y tope de horario
            if (verificarCupoHorario(asignatura) && verificarTopeHorario(estudiante, asignatura)) {
                // Registrar la inscripción
                Asigcursadas asigcursadas = new Asigcursadas();
                asigcursadas.setEstudiante(estudiante);
                asigcursadas.setAsignatura(asignatura);
                asigcursadas.setVecesCursada(1); // Primera vez que se inscribe
                asigcursadas.setEstado("Inscrito");

                asigcursadasService.saveAsigcursadas(asigcursadas);

                // Actualizar la cantidad de asignaturas del estudiante
                estudiante.setCantidadAsignaturas(estudiante.getCantidadAsignaturas() + 1);
                estudianteService.saveEstudiante(estudiante);
            } else {
                throw new RuntimeException("No hay cupo, tope de horario o conflicto de horario para la asignatura");
            }
        } else {
            throw new RuntimeException("No cumple con las condiciones de inscripción");
        }
    }

    private boolean cumpleCondicionesInscripcion(Estudiante estudiante, Asignatura asignatura) {
        // Lógica para verificar todas las condiciones de inscripción
        // (prerrequisitos, máximo de asignaturas por nivel, reprobaciones, etc.)
        // Retorna true si cumple todas las condiciones, false en caso contrario

        // Ejemplo: Verificar si el estudiante ha aprobado los prerrequisitos
        List<Prerrequisito> prerrequisitos = prerrequisitoService.getPrerrequisitosByAsignatura(asignatura);
        for (Prerrequisito prerrequisito : prerrequisitos) {
            if (!haAprobadoPrerrequisito(estudiante, prerrequisito.getAsignatura())) {
                return false;
            }
        }

        // Verificar mínimo y máximo de asignaturas por semestre y nivel

        int asignaturasInscritasEsteSemestre = asigcursadasService.getAsignaturasInscritasEsteSemestre(estudiante);
        if (asignaturasInscritasEsteSemestre < 3) {
            return false;
        }

        int asignaturasInscritasNivel = asigcursadasService.getAsignaturasInscritasNivel(estudiante, asignatura.getNivel());
        if (asignaturasInscritasNivel >= getMaximoAsignaturasPorNivel(estudiante)) {
            return false;
        }

        // Otras condiciones...

        return true;
    }

    private boolean verificarCupoHorario(Asignatura asignatura) {
        // Lógica para verificar disponibilidad de cupo
        // Retorna true si hay cupo, false en caso contrario

        if (asignatura.getCupo() != null && asignatura.getCantidadEstudiantes() >= asignatura.getCupo()) {
            return false;
        }

        // Otras condiciones...

        return true;
    }

    private boolean verificarTopeHorario(Estudiante estudiante, Asignatura asignatura) {
        // Lógica para verificar tope de horario
        // Retorna true si no hay conflicto de horario, false en caso contrario

        // Implementa la lógica según la estructura de tus horarios

        return true;
    }

    private boolean haAprobadoPrerrequisito(Estudiante estudiante, Asignatura prerrequisito) {
        // Lógica para verificar si el estudiante ha aprobado un prerrequisito
        // Puedes implementar esta lógica utilizando AsigcursadasService u otros servicios necesarios

        return true;  // Reemplaza con la lógica real
    }

    private int getMaximoAsignaturasPorNivel(Estudiante estudiante) {
        // Lógica para obtener el máximo de asignaturas permitidas por nivel para un estudiante
        // Puedes implementar esta lógica según tus requerimientos

        return 0;  // Reemplaza con la lógica real
    }
}
