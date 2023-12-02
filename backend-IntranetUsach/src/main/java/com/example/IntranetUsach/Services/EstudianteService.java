package com.example.IntranetUsach.Services;

import com.example.IntranetUsach.Entities.Estudiante;
import com.example.IntranetUsach.Repositories.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    public List<Estudiante> getAllEstudiantes() {
        return estudianteRepository.findAll();
    }

    public Estudiante getEstudianteByRut(String rut) {
        return estudianteRepository.findById(rut).orElse(null);
    }

    public void saveEstudiante(Estudiante estudiante) {
        estudianteRepository.save(estudiante);
    }

    // Otros métodos necesarios
}
