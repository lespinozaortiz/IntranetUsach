package com.example.IntranetUsach.Services;

import com.example.IntranetUsach.Entities.Asigcursadas;
import com.example.IntranetUsach.Repositories.AsigcursadasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AsigcursadasService {

    @Autowired
    private AsigcursadasRepository asigcursadasRepository;

    public List<Asigcursadas> getAllAsigcursadas() {
        return asigcursadasRepository.findAll();
    }

    public void saveAsigcursadas(Asigcursadas asigcursadas) {
        asigcursadasRepository.save(asigcursadas);
    }

    // Otros métodos necesarios
}
