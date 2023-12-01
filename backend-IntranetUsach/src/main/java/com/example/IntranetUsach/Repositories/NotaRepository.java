package com.example.IntranetUsach.Repositories;

import com.example.IntranetUsach.Entities.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotaRepository extends JpaRepository<Nota,Long> {
}
