package com.example.IntranetUsach.Controllers;

import com.example.IntranetUsach.Entities.Horarios;
import com.example.IntranetUsach.Services.HorariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="http://localhost:5173")
@RequestMapping("/api/horarios")
public class HorariosController {

    private final HorariosService horariosService;

    @Autowired
    public HorariosController(HorariosService horariosService) {
        this.horariosService = horariosService;
    }



    @PostMapping("/agregar")
    public ResponseEntity<?> agregarHorario(@RequestBody Horarios horario) {
        //  verificar que la asignatura no sea nula
        if (horario.getAsignatura() == null || horario.getAsignatura().getCodasig() == null) {
            // Manejo de error, por ejemplo, lanzar una excepción o devolver un ResponseEntity con un mensaje de error.
            return ResponseEntity.badRequest().body("La asignatura no puede ser nula.");
        }

        // Guardar el horario
        Horarios horarioGuardado = horariosService.guardarHorario(horario);
        return ResponseEntity.ok(horarioGuardado);
    }

    @GetMapping("/getByAsignatura")
    public List<Horarios> getHorariosByAsignatura(@RequestParam Long codAsignatura) {
        return horariosService.getHorariosByAsignaturaCod(codAsignatura);
    }

}

