package com.example.IntranetUsach.Repositories;

import com.example.IntranetUsach.Entities.Prerrequisito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrerrequisitoRepository extends JpaRepository<Prerrequisito,Long> {
}
