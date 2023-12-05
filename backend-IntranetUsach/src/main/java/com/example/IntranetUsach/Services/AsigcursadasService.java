package com.example.IntranetUsach.Services;

import com.example.IntranetUsach.Entities.Asigcursadas;
import com.example.IntranetUsach.Entities.Asignatura;
import com.example.IntranetUsach.Entities.Estudiante;
import com.example.IntranetUsach.Entities.Prerrequisito;
import com.example.IntranetUsach.Repositories.AsigcursadasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AsigcursadasService {

    @Autowired
    private AsigcursadasRepository asigcursadasRepository;
    @Autowired
    private EstudianteService estudianteService;

    @Autowired
    private AsignaturaService asignaturaService;


    public List<Asigcursadas> getAllAsigcursadas() {
        return asigcursadasRepository.findAll();
    }

    public void saveAsigcursadas(Asigcursadas asigcursadas) {
        asigcursadasRepository.save(asigcursadas);
    }

    // Otros métodos necesarios

    public long countByEstudiante(Estudiante estudiante) {
        return asigcursadasRepository.countByEstudiante(estudiante);
    }

    public Asigcursadas findByEstudianteAndAsignatura(Estudiante estudiante, Asignatura asignatura) {
        return asigcursadasRepository.findByEstudianteAndAsignatura(estudiante, asignatura);
    }

    public boolean hasApprovedAllPrerequisites(Estudiante estudiante, List<Prerrequisito> prerequisitos) {
        for (Prerrequisito prerrequisito : prerequisitos) {
            Asignatura prerequisitoAsignatura = prerrequisito.getAsignatura();
            Asigcursadas asigcursadasPrerequisito = findByEstudianteAndAsignatura(estudiante, prerequisitoAsignatura);

            if (asigcursadasPrerequisito == null || !"aprobado".equals(asigcursadasPrerequisito.getEstado())) {
                return false;
            }
        }
        return true;
    }

    public List<Asigcursadas> findByEstudiante(Estudiante estudiante) {
        return asigcursadasRepository.findByEstudiante(estudiante);
    }
    public void save(Asigcursadas asigcursadas) {
        asigcursadasRepository.save(asigcursadas);
    }

    public Integer findVecesCursadaByEstudianteAndAsignatura(String rut, Long codasig) {
        Estudiante estudiante = estudianteService.findByRut(rut);
        Asignatura asignatura = asignaturaService.findByCodAsignatura(codasig);

        Asigcursadas asigcursadas = asigcursadasRepository.findByEstudianteAndAsignatura(estudiante, asignatura);

        // Si asigcursadas es null, significa que no hay información para esa combinación de estudiante y asignatura
        return (asigcursadas != null) ? asigcursadas.getVecescursada() : null;
    }


    public List<Asigcursadas> findByAsignaturaId(Long idAsignatura) {
        return asigcursadasRepository.findByAsignatura_Codasig(idAsignatura);
    }





}
