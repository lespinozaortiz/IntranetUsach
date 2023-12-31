package com.example.IntranetUsach.Services;

import com.example.IntranetUsach.Entities.Asigcursadas;
import com.example.IntranetUsach.Entities.Asignatura;
import com.example.IntranetUsach.Entities.Carrera;
import com.example.IntranetUsach.Entities.Prerrequisito;
import com.example.IntranetUsach.Repositories.AsignaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AsignaturaService {

    @Autowired
    private AsignaturaRepository asignaturaRepository;


    public List<Asignatura> getAllAsignaturas() {
        return asignaturaRepository.findAll();
    }

    public Optional<Asignatura> getAsignaturaById(Long id) {
        return asignaturaRepository.findById(id);
    }

    public void saveAsignatura(Asignatura asignatura) {
        asignaturaRepository.save(asignatura);
    }


    public Asignatura findByCodAsignatura(Long codAsignatura) {
        return asignaturaRepository.findByCodasig(codAsignatura)
                .orElseThrow(() -> new RuntimeException("Asignatura no encontrada con el código: " + codAsignatura));
    }
    public List<Asignatura> findByCarreraAndNivel(Carrera carrera, Integer nivel) {
        Long codCarrera = carrera.getCodcarr(); // Extraer el código de la carrera
        return asignaturaRepository.findByCarreraCodcarrAndNivel(codCarrera,nivel);
    }
    public Asignatura save(Asignatura asignatura) {
        return asignaturaRepository.save(asignatura);
    }

    public Asignatura findById(Long id) {
        return asignaturaRepository.findById(id).orElse(null);
    }







}
