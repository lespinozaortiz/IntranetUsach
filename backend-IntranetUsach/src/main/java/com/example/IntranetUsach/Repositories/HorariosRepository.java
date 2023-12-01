package com.example.IntranetUsach.Repositories;

import com.example.IntranetUsach.Entities.Horarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HorariosRepository extends JpaRepository<Horarios,Long> {
}
