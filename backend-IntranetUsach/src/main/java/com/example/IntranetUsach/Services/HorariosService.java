package com.example.IntranetUsach.Services;

import com.example.IntranetUsach.Entities.Asigcursadas;
import com.example.IntranetUsach.Entities.Asignatura;
import com.example.IntranetUsach.Entities.Horarios;
import com.example.IntranetUsach.Repositories.HorariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HorariosService {

    private final HorariosRepository horariosRepository;

    @Autowired
    public HorariosService(HorariosRepository horariosRepository) {
        this.horariosRepository = horariosRepository;
    }

    public Horarios guardarHorario(Horarios horario) {
        return horariosRepository.save(horario);
    }

    public Horarios findByAsignaturaAndModulo(Asignatura asignatura, String modulo) {
        return horariosRepository.findByAsignaturaAndModulo(asignatura, modulo);
    }

    public boolean hasScheduleConflict(List<Asigcursadas> asignaturasInscritas, Asignatura nuevaAsignatura, String nuevoModulo) {
        for (Asigcursadas asignaturaInscrita : asignaturasInscritas) {
            Horarios horarioInscrito = findByAsignaturaAndModulo(asignaturaInscrita.getAsignatura(), "modulo");
            if (horarioInscrito != null && horarioInscrito.getModulo().equals(nuevoModulo)) {
                return true; // Hay tope de horario
            }
        }
        return false; // No hay tope de horario
    }

    public List<Horarios> getHorariosByAsignaturaCod(Long codAsignatura) {
        return horariosRepository.findByAsignatura_Codasig(codAsignatura);
    }
}
