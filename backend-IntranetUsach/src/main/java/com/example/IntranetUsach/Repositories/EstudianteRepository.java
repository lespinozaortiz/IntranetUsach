package com.example.IntranetUsach.Repositories;

import com.example.IntranetUsach.Entities.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante,String> {
}
