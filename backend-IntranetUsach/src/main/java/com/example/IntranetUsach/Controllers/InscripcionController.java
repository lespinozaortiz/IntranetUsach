package com.example.IntranetUsach.Controllers;

import com.example.IntranetUsach.Services.InscripcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/inscripcion")
@CrossOrigin(origins = "http://localhost:5173")
public class InscripcionController {

    @Autowired
    private InscripcionService inscripcionService;

    @PostMapping("/inscribir")
    public ResponseEntity<String> inscribirAsignatura(@RequestBody Map<String, Object> payload) {
        try {
            String rut = (String) payload.get("rut");
            Long cod_Asignatura = Long.parseLong(payload.get("cod_Asignatura").toString());

            inscripcionService.inscribirAsignatura(rut, cod_Asignatura);
            return ResponseEntity.ok("{\"message\": \"Asignatura inscrita exitosamente\"}");
        } catch (Exception e) {
            String errorMessage = "Error al inscribir la asignatura: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"" + errorMessage + "\"}");
        }
    }
}

