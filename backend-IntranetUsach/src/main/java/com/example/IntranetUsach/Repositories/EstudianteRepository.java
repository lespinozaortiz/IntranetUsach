package com.example.IntranetUsach.Repositories;

import com.example.IntranetUsach.Entities.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante,String> {
    Optional<Estudiante> findByRut(String rut);
}
