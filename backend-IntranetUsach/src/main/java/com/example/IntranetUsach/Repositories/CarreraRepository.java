package com.example.IntranetUsach.Repositories;

import com.example.IntranetUsach.Entities.Carrera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarreraRepository extends JpaRepository<Carrera,Long> {
}
