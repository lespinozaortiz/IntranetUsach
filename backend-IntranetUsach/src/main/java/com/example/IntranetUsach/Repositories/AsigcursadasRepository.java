package com.example.IntranetUsach.Repositories;

import com.example.IntranetUsach.Entities.Asigcursadas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsigcursadasRepository extends JpaRepository<Asigcursadas,Long> {


}