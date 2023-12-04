package com.example.IntranetUsach.Repositories;

import com.example.IntranetUsach.Entities.Asignatura;
import com.example.IntranetUsach.Entities.Prerrequisito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrerrequisitoRepository extends JpaRepository<Prerrequisito, Long> {
    List<Prerrequisito> findByAsignatura(Asignatura asignatura);

    List<Prerrequisito> findByAsignatura_codasig(Long codAsignatura);
}
