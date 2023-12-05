package com.example.IntranetUsach.Repositories;

import com.example.IntranetUsach.Entities.Asignatura;
import com.example.IntranetUsach.Entities.Horarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HorariosRepository extends JpaRepository<Horarios,Long> {

    Horarios findByAsignaturaAndModulo(Asignatura asignatura, String modulo);

    List<Horarios> findByAsignatura_Codasig(Long codAsignatura);
}
