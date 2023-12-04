package com.example.IntranetUsach.Repositories;

import com.example.IntranetUsach.Entities.Asignatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AsignaturaRepository extends JpaRepository<Asignatura,Long> {
    Optional<Asignatura> findByCodasig(Long codAsignatura);

    List<Asignatura> findByCarreraCodcarrAndNivel(Long codCarrera, Integer nivel);


}
