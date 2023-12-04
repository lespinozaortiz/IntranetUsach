package com.example.IntranetUsach.Services;

import com.example.IntranetUsach.Entities.Asignatura;
import com.example.IntranetUsach.Entities.Prerrequisito;
import com.example.IntranetUsach.Repositories.PrerrequisitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrerrequisitoService {

    @Autowired
    private PrerrequisitoRepository prerrequisitoRepository;

    // Otros métodos y servicios necesarios

    public List<Prerrequisito> getPrerrequisitosByAsignatura(Asignatura asignatura) {
        // Lógica para obtener los prerrequisitos de una asignatura específica
        return prerrequisitoRepository.findByAsignatura(asignatura);
    }

    public List<Prerrequisito> findByCodAsignatura(Long codAsignatura) {
        return prerrequisitoRepository.findByAsignatura_codasig(codAsignatura);
    }

    // Otros métodos y servicios necesarios
}
