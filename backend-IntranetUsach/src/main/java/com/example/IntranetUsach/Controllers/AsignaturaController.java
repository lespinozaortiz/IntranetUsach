package com.example.IntranetUsach.Controllers;

import com.example.IntranetUsach.Entities.Asigcursadas;
import com.example.IntranetUsach.Entities.Asignatura;
import com.example.IntranetUsach.Services.AsignaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/asignaturas")
public class AsignaturaController {

    private final AsignaturaService asignaturaService;

    @Autowired
    public AsignaturaController(AsignaturaService asignaturaService) {
        this.asignaturaService = asignaturaService;
    }

    @GetMapping
    public List<Asignatura> getAllAsignaturas() {
        return asignaturaService.getAllAsignaturas();
    }

    @GetMapping("/{id}")
    public Optional<Asignatura> getAsignaturaById(@PathVariable Long id) {
        return asignaturaService.getAsignaturaById(id);
    }







}
