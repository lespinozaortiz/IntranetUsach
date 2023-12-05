package com.example.IntranetUsach.Controllers;



import com.example.IntranetUsach.Entities.Asigcursadas;
import com.example.IntranetUsach.Services.AsigcursadasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/asigcursadas")
public class AsigcursadasController {

    private final AsigcursadasService asigcursadasService;

    @Autowired
    public AsigcursadasController(AsigcursadasService asigcursadasService) {
        this.asigcursadasService = asigcursadasService;
    }

    @GetMapping("/{idAsignatura}")
    public ResponseEntity<List<Asigcursadas>> getEstudiantesCursando(@PathVariable Long idAsignatura) {
        List<Asigcursadas> estudiantesCursando = asigcursadasService.findByAsignaturaId(idAsignatura);
        return new ResponseEntity<>(estudiantesCursando, HttpStatus.OK);
    }

    // Puedes agregar más métodos según tus necesidades
}
