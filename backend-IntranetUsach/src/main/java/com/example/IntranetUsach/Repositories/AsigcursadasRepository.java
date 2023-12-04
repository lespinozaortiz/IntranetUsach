package com.example.IntranetUsach.Repositories;

import com.example.IntranetUsach.Entities.Asigcursadas;
import com.example.IntranetUsach.Entities.Asignatura;
import com.example.IntranetUsach.Entities.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AsigcursadasRepository extends JpaRepository<Asigcursadas,Long> {

    long countByEstudiante(Estudiante estudiante);
    Asigcursadas findByEstudianteAndAsignatura(Estudiante estudiante, Asignatura asignatura);
    List<Asigcursadas> findByEstudiante(Estudiante estudiante);


}