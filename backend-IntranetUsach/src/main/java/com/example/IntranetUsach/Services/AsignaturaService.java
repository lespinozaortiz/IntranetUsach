package com.example.IntranetUsach.Services;

import com.example.IntranetUsach.Entities.Asignatura;
import com.example.IntranetUsach.Entities.Prerrequisito;
import com.example.IntranetUsach.Repositories.AsignaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AsignaturaService {

    @Autowired
    private AsignaturaRepository asignaturaRepository;

    public List<Asignatura> getAllAsignaturas() {
        return asignaturaRepository.findAll();
    }

    public Asignatura getAsignaturaById(Long id) {
        return asignaturaRepository.findById(id).orElse(null);
    }

    public void saveAsignatura(Asignatura asignatura) {
        asignaturaRepository.save(asignatura);
    }

}
