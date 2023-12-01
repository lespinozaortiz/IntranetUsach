package com.example.IntranetUsach.Entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table
@Data
public class Carrera {
    @Id
    @Column(name = "cod_carrera", nullable = false, unique = true)
    private Long cod_carrera;
    private String nombre_carrera;
}
