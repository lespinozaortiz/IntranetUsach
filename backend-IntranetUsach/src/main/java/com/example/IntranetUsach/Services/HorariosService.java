package com.example.IntranetUsach.Services;

import com.example.IntranetUsach.Entities.Horarios;
import com.example.IntranetUsach.Repositories.HorariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
